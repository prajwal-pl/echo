"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteAccount, getUser, updateProfile } from "./actions";
import { UploadButton } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setName(userData?.name || "");
      setImage(userData?.image || "");
    };
    fetchUser();
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpdateProfile = () => {
    try {
      updateProfile(name, image);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount().then(() => {
        router.push("/");
      });
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
      console.error("Error deleting account:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Profile</h1>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
          <Image
            src={image || "/404.png"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-500">{session?.user?.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Profile Picture
            </label>
            {/* <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full flex items-center justify-center"
            /> */}
            <UploadButton
              endpoint="imageUploader"
              className="ut-button:dark:bg-white ut-button:dark:text-black ut-button:bg-black ut-button:text-white ut-button:w-full ut-allowed-content:sr-only"
              onClientUploadComplete={(res: any) => {
                if (res && res.length > 0) {
                  setImage(res[0].url);
                }
                toast({
                  title: "New Profile Picture Uploaded",
                  description: "Your profile picture has been uploaded.",
                });
              }}
            />
          </div>
          <Button onClick={handleUpdateProfile} className="w-full md:w-auto">
            Update Profile
          </Button>
        </div>
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold text-red-600 mb-4">
            Danger Zone
          </h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full md:w-auto">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[90vw] md:max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <AlertDialogCancel className="w-full sm:w-auto">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="w-full sm:w-auto bg-red-900 hover:bg-red-800 text-white"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

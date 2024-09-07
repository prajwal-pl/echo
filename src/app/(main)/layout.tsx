import Sidebar from "@/components/global/sidebar";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="fixed top-0 left-0 h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 ml-[60px]">{children}</div>
    </div>
  );
};

export default layout;

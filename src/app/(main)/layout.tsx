import ResponsiveSidebar from "@/components/global/responsive-sidebar";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <ResponsiveSidebar>{children}</ResponsiveSidebar>;
};

export default layout;

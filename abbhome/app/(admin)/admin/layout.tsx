import Sidebar from "@/Layouts/AdminSidebar/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    );
}
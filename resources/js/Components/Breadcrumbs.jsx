// Breadcrumbs.jsx
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link } from "@inertiajs/react";

export default function Breadcrumbs({ links = [] }) {
    return (
        <div className="relative overflow-x-auto mx-2 my-2">
            <Breadcrumb>
                <BreadcrumbList>
                    {links.map((link, index) => (
                        <BreadcrumbItem key={index}>
                            {index !== links.length - 1 ? (
                                <>
                                    <BreadcrumbLink asChild>
                                        <Link href={link.href}>
                                            {link.name}
                                        </Link>
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                </>
                            ) : (
                                <BreadcrumbPage>{link.name}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

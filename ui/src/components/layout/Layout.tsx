import { Outlet, useLocation } from 'react-router-dom';
import { Separator } from '@radix-ui/react-separator';
import { AppSidebar } from '../app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

import { useMemo } from 'react';

function Layout() {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const paths = location.pathname.split('/').filter(Boolean);

    if (paths.length === 0) {
      return [{ label: 'Dashboard', isActive: true }];
    }

    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      isActive: index === paths.length - 1,
      href: '/' + paths.slice(0, index + 1).join('/'),
    }));
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-10 shrink-0 items-center'>
          <div className='flex items-center  px-4'>
            <SidebarTrigger />
            <Separator
              orientation='vertical'
              className='mr-2 data-[orientation=vertical]:h-4'
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='/'>Amit Inc</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.map((breadcrumb, index) => (
                  <div key={breadcrumb.label} className='contents'>
                    <BreadcrumbSeparator className='hidden md:block' />
                    <BreadcrumbItem>
                      {breadcrumb.isActive ? (
                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={breadcrumb.href}>
                          {breadcrumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='border-t'></div>
        <div className='flex flex-1 flex-col gap-4  pt-0'>
          <div className=' flex-1 md:min-h-min relative'>
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;

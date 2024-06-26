import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import logo from "../image/shiba_upscayl.png";
import { useAuthenticator } from "@aws-amplify/ui-react";

// Define the NavbarProps interface
interface NavbarProps {
  onLogin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut } = useAuthenticator();
  const { id } = useParams();

  const navigation = [
    { name: "Dashboard", path: `/dashboard/${id}` },
    { name: "Tests", path: `/dashboard/${id}/tests` },
    { name: "Reports", path: `/dashboard/${id}/reports` },
    { name: "Settings", path: `/dashboard/${id}/settings` },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-gray-800">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <NavLink to={`/dashboard/${id}`} className="flex lg:flex-1">
          <span className="sr-only">Spelling Shiba Scrambler</span>
          <img
            className="h-8 w-8 rounded-full"
            src={logo}
            alt="Shiba with floating letters"
          />
        </NavLink>
        <div className="flex ">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog className="" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="sr-only">Spelling Shiba Scrambler</span>
              <img
                className="h-8 w-auto rounded-full"
                src={logo}
                alt="Shiba with floating letters"
              />
            </div>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div
                className="py-6"
                style={{ display: onLogin ? "none" : "block" }}
              >
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-white w-full bg-red-500 hover:bg-red-600 rounded-md px-3 py-2 text-sm font-medium"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;

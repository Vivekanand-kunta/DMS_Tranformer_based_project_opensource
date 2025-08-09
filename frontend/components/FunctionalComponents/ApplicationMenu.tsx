import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export function AppNavigationMenu() {
  return (
    <NavigationMenu className="mt-6 ml-3">
      <NavigationMenuList>
        
        <NavigationMenuItem className="mt-0.25 text-xl text-bold">
          <Link href="/" >
            <NavigationMenuLink className="px-4 py-2 hover:underline">
              Credentials
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className="text-xl text-bold">
          <Link href="/home">
            <NavigationMenuLink className="px-4 py-2 hover:underline">
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

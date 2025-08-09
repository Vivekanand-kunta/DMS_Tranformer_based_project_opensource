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
        
        <NavigationMenuItem className="mt-0.25 text-xl font-bold">
          <NavigationMenuLink href="/" className="px-4 py-2 hover:underline">
            Credentials
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="text-xl font-bold">
          <NavigationMenuLink href="/home" className="px-4 py-2 hover:underline">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

import {
    CircleUser,
    Menu,
    Package2,
    Search,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PopoverDemo } from "./popOver"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MdDarkMode } from "react-icons/md";
import { useContext } from "react"
import { ThemeContext } from "./themeContext"
import { Navigate, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export function Dashboard({ screenTitle, children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)
    return (
        <div className={`grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]`}>
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <a href="/" className="flex items-center gap-2 font-semibold">
                            <span className="">Forus</span>
                        </a>
                        <Button variant="outline" size="icon" onClick={toggleTheme} className="ml-auto h-8 w-8">
                            <MdDarkMode />
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <a
                                href="/dashboard"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                    }`}
                            >
                                Home
                            </a>
                            <a
                                href="/transport"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/transport') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                    }`}
                            >
                                Transport
                            </a>
                            <a
                                href="/tracking"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/tracking') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                    }`}
                            >
                                Tracking
                            </a>
                            <a
                                href="/moneymanager"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/moneymanager') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                    }`}

                            >
                                MoneyManager
                            </a>
                            <a
                                href="/vendors"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/vendors') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                    }`}

                            >
                                Vendors
                            </a>
                            <PopoverDemo></PopoverDemo>
                            <a
                                href="/settings"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/settings') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                    }`}
                            >
                                Settings
                            </a>

                        </nav>
                    </div>

                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <a
                                    href="/dashboard"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/dashboard') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    Home
                                </a>
                                <a
                                    href="/transport"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/transport') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    Transport
                                </a>
                                <a
                                    href="/tracking"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/tracking') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    Tracking
                                </a>
                                <a
                                    href="/moneymanager"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/moneymanager') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}

                                >
                                    MoneyManager
                                </a>
                                <PopoverDemo></PopoverDemo>
                                <a
                                    href="/settings"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/settings') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                        }`}
                                >
                                    Settings
                                </a>
                            </nav>

                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                                localStorage.clear();
                                navigate("/login")
                            }}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">{screenTitle}</h1>
                    </div>
                    <div
                        className="flex flex-1 justify-start rounded-lg border border-1 shadow-sm" x-chunk="dashboard-02-chunk-1"
                    >
                        {/* <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                                You have no products
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                You can start selling as soon as you add a product.
                            </p>
                            <Button className="mt-4">Add Product</Button>
                        </div> */}{children}
                    </div>
                </main>
            </div>
        </div>
    )
}


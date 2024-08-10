import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverDemo() {
    const isActive = (path) => location.pathname === path
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className={` rounded-lg transition-all py-2 text-left px-3 ${isActive('/pdrs') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'}`} >Alert</button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] text-sm font-semibold">
                <div className="flex flex-col ">
                    <a
                        href="/pdrs"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/pdrs') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                            }`}

                    >
                        PDRS
                    </a>
                    <a
                        href="/floodhub"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive('/floodhub') ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                            }`}

                    >
                        Disaster Navigator
                    </a>
                </div>
            </PopoverContent>
        </Popover>
    )
}

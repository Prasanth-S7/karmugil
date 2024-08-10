import { Dashboard } from "@/components/custom-component/Dashboard"
import { ListofVendors } from "@/components/custom-component/listOfVendors"
export function Vendors() {
    return (
        <div>
            <Dashboard screenTitle="Vendors List">
                <div className="h-[570px] w-full overflow-y-auto">
                    <ListofVendors></ListofVendors>
                </div>
            </Dashboard>
        </div>
    )
}
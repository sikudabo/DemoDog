import { useStartupEmployeeData } from "../../hooks";
import { StartupEmployeeType } from "../../typings/StartupEmployeeType";
import { SideNav } from "../../components/Sidenav";

type StartupDashboardDisplayLayerProps = {
    startupEmployee: StartupEmployeeType | {}
};

export default function StartupDashboard() {
    return <StartupDashboard_DisplayLayer {...useDataLayer()} />;
}

function StartupDashboard_DisplayLayer({
    startupEmployee,
}: StartupDashboardDisplayLayerProps) {
    const { firstName } = startupEmployee as StartupEmployeeType;

    return (
        <div>
            <SideNav open={true} />
            Welcome to your dashboard {firstName}!
        </div>
    );
}

function useDataLayer() {
    const { employee: startupEmployee } = useStartupEmployeeData();
    console.log('The startup employee is: ', startupEmployee);
    
    return {
        startupEmployee,
    };
}
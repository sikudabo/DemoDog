import { useStartupEmployeeData } from "../../hooks";
import { StartupEmployeeType } from "../../typings/StartupEmployeeType";
import { SideNav } from "../../components/Sidenav";
import { DashboardLayout } from "../../components/DashboardLayout";

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
        <DashboardLayout>
            <div style={{ paddingTop: 50, alignItems: 'center', paddingRight: 20, paddingLeft: 20 }}>
                Welcome to your dashboard {firstName}!
            </div>
        </DashboardLayout>
    );
}

function useDataLayer() {
    const { employee: startupEmployee } = useStartupEmployeeData();
    console.log('The startup employee is: ', startupEmployee);
    
    return {
        startupEmployee,
    };
}
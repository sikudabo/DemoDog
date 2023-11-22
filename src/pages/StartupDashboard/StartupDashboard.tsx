import { useStartupEmployeeData } from "../../hooks";
import { StartupEmployeeType } from "../../typings/StartupEmployeeType";

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
            Welcome to your dashboard {firstName}!
        </div>
    );
}

function useDataLayer() {
    const { employee: startupEmployee } = useStartupEmployeeData();
    
    return {
        startupEmployee,
    };
}
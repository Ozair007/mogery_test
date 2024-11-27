import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const FilterDropdown = ({ options, selected, setSelected }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 bg-gray-200 text-sm rounded-md cursor-pointer hover:bg-gray-300">
                {options.find((option) => option.value === selected)?.label}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-md py-2">
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSelected(option.value)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"

const Popup = ({tag} : { tag : string}) => {

    const router = useRouter()

    return (
        <Popover>
            <PopoverTrigger className="text-sm px-2 py-2 font-semibold bg-gray-900 text-white rounded-lg shadow-md hover:bg-gray-800 transition duration-150 active:scale-95 focus:outline-none">
                <span
                >Solve!</span>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-4 p-6 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-900 max-w-xs text-center border border-gray-300 dark:border-gray-700">
                <span className="text-md font-medium text-gray-800 dark:text-gray-200 leading-tight">
                    How many questions would you like to solve?
                </span>
                <div className="flex justify-around">
                    <button onClick={() => router.push(`/main?id=${tag}&limit=10`)}
                    className="w-12 h-12 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-700 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-300 transition">
                        10
                    </button>
                    <button onClick={() => router.push(`/main?id=${tag}&limit=15`)}
                    className="w-12 h-12 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-700 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-300 transition">
                        15
                    </button>
                    <button onClick={() => router.push(`/main?id=${tag}&limit=20`)}
                    className="w-12 h-12 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-700 dark:bg-gray-100 dark:text-black dark:hover:bg-gray-300 transition">
                        20
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default Popup

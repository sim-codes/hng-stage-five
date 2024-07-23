import Dropdown from "@/app/ui/profile/dropdown";
import { Link as LinkIcon } from "lucide-react";

export default function LinkCard({link, index}: {
    link: string,
    index: number
}) {
    return (
        <div className="bg-grey/20 p-5 rounded-xl gap-5">
            <div className="flex justify-between">
                <span>Link{index+1}</span>
                <span>Remove</span>
            </div>
            <div className="text-sm">
                <div>
                    <label
                    className="mb-3 mt-5 block font-normal"
                    htmlFor="dropdown"
                    >
                    Platform
                    </label>
                    <div className="relative">
                        <Dropdown />
                    </div>
                </div>
                <div>
                    <label
                    className="mb-3 mt-5 block font-normal"
                    htmlFor="email"
                    >
                    Link
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-grey py-3 px-4 pl-10 text-sm autofill:bg-white placeholder:text-darkGrey focus:outline-none shadow-none transition-all focus:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus:border-primary"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="e.g.https//www.github.com/simcodes"
                            required
                        />
                        <LinkIcon size={18}
                        className="pointer-events-none text-darkGrey absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                    </div>
                </div>
            </div>
        </div>
    )
}

'use client'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Popup from "./Popup";

const CustomCard = ({ title, description }: {
    title: string;
    description: string;
}) => {

    const router = useRouter();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>
                <p>{description}</p>
            </CardContent>

            <CardFooter>
                <Popup tag={title}/>
            </CardFooter>
        </Card>
    )
}

export default CustomCard

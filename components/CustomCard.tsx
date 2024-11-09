'use client'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Popup from "./Popup";

const CustomCard = ({ title, description }: {
    title: string;
    description: string;
}) => {

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

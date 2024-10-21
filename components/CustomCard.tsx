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
                <Button
                    onClick={() => router.replace(`/main?id=${title}`)}
                    variant="outline">
                    Solve!
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CustomCard

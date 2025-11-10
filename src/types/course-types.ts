interface sections {
    title: string;
    content: string;
}

export interface course {
    id: number;
    title: string;
    slug: string;
    average_duration: string;
    average_fees: string;
    description: string;
    sections: sections[];

}

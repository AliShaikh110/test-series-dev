export interface filter_value {
 id:number
 title:string 
 slug: string 
}

export interface filter_values{
    data: Array<{
        id: number;
        title: string;
        slug: string;
        universityys:{
          data:{
            id:number;
          }[]
        }
      }>;
      meta?: {
        pagination: {
          total: number;
          // Add other pagination properties if needed
          page?: number;
          pageSize?: number;
          pageCount?: number;
        };
      };
}
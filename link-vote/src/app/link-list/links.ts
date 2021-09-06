

export const links: Link[] = [
    {
        name: 'Hacker News',
        url: 'https://news.ycombinator.com/',
        point: 5
    },
    {
        name: 'Product Hunt',
        url: 'https://producthunt.com/',
        point: 10
    },
]

export interface Link {
    name: string,
    url: string,
    point: number 
  }
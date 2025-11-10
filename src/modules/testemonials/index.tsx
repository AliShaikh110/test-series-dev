/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "Best agency",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Helping", href: "#" },
    author: {
      name: "Michael Foster",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 1,
    title: "Best agency",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Education", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 1,
    title: "Best agency",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function Testemonials() {
  return (
    <div className="bg-gray-50 ">
      <div className="max-w-6xl mx-auto py-24 sm:py-20 relative">
        <div className="px-6 lg:px-8 z-8">
          <div className=" px-4 sm:py-0  flex   flex-col  gap-y-4 mb-6 text-center">
            <h3 className=" text-4xl font-bold tracking-tight bg-clip-text text-transparent  bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white pb-1  line-clamp-none md:text-4xl lg:text-5xl font-sans  relative z-20   my-0">
              Ask the people
            </h3>
            <p className="text-lg font-medium text-gray-500 text-center">
              How do they feel about our services
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t sm:py-10 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
            {posts.map((post, i) => (
              <article
                key={i}
                className="flex max-w-xl flex-col items-start justify-between bg- p-6 rounded-2xl border border-borderLight dark:border-border"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={post.datetime}
                    className="text-dark dark:text-light"
                  >
                    {post.date}
                  </time>
                  <Link
                    href={post.category.href}
                    className="relative z-10 rounded-full  px-3 py-1.5 font-medium text-light "
                  >
                    {post.category.title}
                  </Link>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6  ">
                    <span className=" text-dark dark:text-light">
                      {post.title}
                    </span>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-dark dark:text-light">
                    {post.description}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={post.author.imageUrl}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-dark dark:text-light">
                      <span>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

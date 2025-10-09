import { H4, Small } from "@/components/ui/typography";

export default function ImageGroupCard() {
  return (
    <div className="flex flex-col aspect-3/2 w-full">
      <div className="grid grid-cols-3 grid-rows-2 gap-1 w-full h-full">
        <div className="col-span-2 row-span-2 bg-amber-400">1</div>
        <div className="col-start-3 bg-blue-400">4</div>
        <div className="col-start-3 row-start-2 bg-green-400">5</div>
      </div>
      <ImageGroupDetails />
    </div>
  );
}

function ImageGroupDetails() {
  return (
    <div className="h-[62px] p-2">
      <H4>Title</H4>
      <div>
        <p className="space-x-2">
          <Small>357 Pins</Small>
          <Small className="text-slate-500">2 mo</Small>
        </p>
      </div>
    </div>
  );
}

export function ImageGroupsContainer() {
  return (
    <div className="flex justify-center w-full p-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full">
        {Array.from({ length: 10 }).map((_, i) => (
          <ImageGroupCard key={i} />
        ))}
      </div>
    </div>
  );
}

/*

requirements for config:

how long to display image
what image to display

Section = {
  count: 5
  interval: 30
}

Config = {
  sections: Array<Section>
  total: number
  pool: Array<Reference>
}

Config -> Session State



still lilfe
https://i.pinimg.com/1200x/de/ef/f1/deeff1b9cc123bf3ccc3cf096cb0de12.jpg
https://i.pinimg.com/736x/a3/12/d1/a312d1b0fb76b4bc9948aa6c7c99dc7c.jpg
https://i.pinimg.com/1200x/9b/9b/a3/9b9ba3d83952429b2452b25b737c708d.jpg
https://i.pinimg.com/736x/13/9c/56/139c56d914ee579b51d4c8136011f9ef.jpg
https://i.pinimg.com/1200x/ba/f0/b2/baf0b24ffb13886038fb4cd68d0d9420.jpg
https://i.pinimg.com/736x/fb/aa/ab/fbaaab17bb52bb55750015f673cc2983.jpg
https://i.pinimg.com/736x/68/c4/82/68c482d31c5127cc2874df09d306fc24.jpg

sculpture
https://i.pinimg.com/736x/88/f7/52/88f75295d24e4ddc1731a92e6cf0dbc1.jpg
https://i.pinimg.com/736x/c9/7f/62/c97f62a736c46c2f291b24d4e6de88de.jpg
https://i.pinimg.com/1200x/cf/81/a2/cf81a21895433384f2a31162aa770cce.jpg
https://i.pinimg.com/736x/94/57/bb/9457bb8037a2f8757aa8e591af877959.jpgo
https://i.pinimg.com/736x/90/e0/3f/90e03fec4e15f8f76d020c4420aa8ef4.jpg

dystopian fashion
https://i.pinimg.com/736x/40/77/9a/40779aa9b943a4bac2429175bd7782a0.jpg
https://i.pinimg.com/1200x/b9/8d/39/b98d3902199052afac5cfe5ffb54fea7.jpg
https://i.pinimg.com/736x/73/87/34/738734c378ea230d278b5a4112b20073.jpg
https://i.pinimg.com/736x/de/57/8e/de578e362756373ff96eafa83af25b41.jpg
https://i.pinimg.com/736x/d7/9c/cd/d79ccd730fdefcab0247a647f3d21a7e.jpg


*/

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card";
import { Button } from "~~/components/ui/button";
// 更新 Project 接口
interface Project {
    id: number
    title: string
    description: string
    image: string
    path: string  // 改为 path，表示内部路由路径
  }
  
  const projects = [
    { 
      id: 1, 
      title: "NFT Market", 
      description: "NFT 交易平台", 
      image: "/nft1.png", 
      path: "/nft/myNFTs"  // 改为内部路径
    },
    { 
      id: 2, 
      title: "Staking App", 
      description: "Decentralized Staking App", 
      image: "/staking.png", 
      path: "/stake/staker-ui"  // 改为内部路径
    },
  ]
  
  export function ProjectCard() {
    const router = useRouter();

    const handleNavigate = (path: string, e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }
      router.push(path);
    };

    return (
      <div className="flex flex-wrap gap-4 my-8 px-5 justify-center">
        {projects.map(project => (
          <Card 
            key={project.id} 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleNavigate(project.path)}
          >
            <CardHeader className="p-0">
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="mt-2">{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={(e) => handleNavigate(project.path, e)}
              >
                了解更多
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }
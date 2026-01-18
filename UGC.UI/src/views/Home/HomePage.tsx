import Landing from "./Landing";
import JoinCommunity from "./JoinCommunity";
import PopularServices from "./PopularServices";
import PopularCategories from "./PopularCategories";
import PeopleSection from "./PeopleSection";
import HowWorksSection from "./HowWorksSection";
import CreatorsServices from "./CreatorsServices";
import TalentCard1 from "./TalentCard1";
import TalentCard2 from "./TalentCard2";
import TalentCard3 from "./TalentCard3";

const _popularServices = [
  {
    id: 1,
    title: "Дизайн и Редизайн",
    serviceName: "WIX",
    serviceType: "Уебсайт",
    sellerName: "Абир Ахмед",
    sellerLevel: "Ниво 2",
    sellerDescription:
      "Ще направя дизайн на Wix уебсайт, редизайн на уебсайт или Wix Studio уебсайт за Вашия бизнес с най-добри практики, чист код и отзивчив дизайн.",
    rating: 4.9,
    reviewCount: 212,
    price: 77,
    finishedProjects: 21,
    bgColor: "#FFD700", // Жълт
    buttonText: "ПИШИ СЕГА",
    buttonColor: "#5b84fa", // Син
    personImages: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", // Project dashboard screenshot
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // Web design workspace
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", // Modern blog layout
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80", // Mobile responsive site demo
      "https://images.unsplash.com/photo-1523473827534-86c15a0107d7?auto=format&fit=crop&w=400&q=80", // Analytics dashboard
      "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=400&q=80", // Portfolio project
    ],
    heartColor: "#fff",
    userPicture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    capabilities: [
      "Уеб дизайн",
      "Редизайн на уебсайт",
      "Уеб разработка",
      "Поддръжка на уебсайт",
      "Хостинг на уебсайт",
      "Сигурност на уебсайт",
    ],
  },
  {
    id: 2,
    title: "Дизайн/Редизайн",
    serviceName: "WIX",
    serviceType: "УЕБСАЙТ",
    sellerName: "Ризви Хосеин",
    sellerLevel: "Високо Оценен",
    sellerDescription:
      "Ще бъда Wix експерт, Wix разработчик за дизайн, уебсайт или онлайн магазин с най-добри практики, чист код и отзивчив дизайн.",
    rating: 4.9,
    reviewCount: 86,
    price: 82,
    finishedProjects: 2,
    bgColor: "#FF6B35", // Оранжев
    buttonText: "Пиши за експертна помощ",
    buttonColor: "#6c757d", // Сив
    personImages: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    ],
    heartColor: "#8B4513", // Кафяв
    userPicture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    capabilities: [
      "Уеб дизайн",
      "Редизайн на уебсайт",
      "Уеб разработка",
      "Поддръжка на уебсайт",
      "Хостинг на уебсайт",
      "Сигурност на уебсайт",
    ],
  },
  {
    id: 3,
    title: "Дизайн и Разработка",
    serviceName: "REACT",
    serviceType: "Приложение",
    sellerName: "Сара Джонсън",
    sellerLevel: "Ниво 1",
    sellerDescription:
      "Ще създам модерни React приложения с най-добри практики, чист код и отзивчив дизайн за вашия бизнес.",
    rating: 4.8,
    reviewCount: 145,
    price: 95,
    finishedProjects: 73,
    bgColor: "#4ECDC4", // Тюркоаз
    buttonText: "ПИШИ СЕГА",
    buttonColor: "#5b84fa",
    personImages: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    ],
    heartColor: "#fff",
    userPicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    capabilities: [
      "Уеб дизайн",
      "Редизайн на уебсайт",
      "Уеб разработка",
      "Поддръжка на уебсайт",
      "Хостинг на уебсайт",
      "Сигурност на уебсайт",
    ],
  },
  {
    id: 4,
    title: "Създаване на съдържание",
    serviceName: "BLOG",
    serviceType: "Писане",
    sellerName: "Майкъл Чен",
    sellerLevel: "Високо Оценен",
    sellerDescription:
      "Ще напиша ангажиращи блог постове и статии за вашия уебсайт или бизнес с най-добри практики, чист код и отзивчив дизайн.",
    rating: 4.7,
    reviewCount: 98,
    price: 65,
    finishedProjects: 218,
    bgColor: "#FFB6C1", // Розов
    buttonText: "Пиши за експертна помощ",
    buttonColor: "#6c757d",
    personImages: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    ],
    heartColor: "#8B4513",
    userPicture:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    capabilities: [
      "Уеб дизайн",
      "Редизайн на уебсайт",
      "Уеб разработка",
      "Поддръжка на уебсайт",
      "Хостинг на уебсайт",
      "Сигурност на уебсайт",
    ],
  },
];

export const HomePage = () => {
  return (
    <>
      <Landing />
      <PopularCategories />
      <PopularServices TalentCard={TalentCard1} _popularServices={_popularServices} />
      <PopularServices TalentCard={TalentCard2} _popularServices={_popularServices} />
      <PopularServices TalentCard={TalentCard3} _popularServices={_popularServices} />
      <CreatorsServices />
      <HowWorksSection />
      <PeopleSection />
      <JoinCommunity />
    </>
  );
};

export default HomePage;

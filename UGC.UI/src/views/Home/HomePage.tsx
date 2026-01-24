import Landing from "./Landing";
import JoinCommunity from "./JoinCommunity";
import PopularServices from "./PopularServices";
import PopularCategories from "./PopularCategories";
import PeopleSection from "./PeopleSection";
import HowWorksSection from "./HowWorksSection";
import CreatorsServices from "./CreatorsServices";
import TalentCard1 from "../../ui-component/cards/TalentCard1";
import TalentCard2 from "../../ui-component/cards/TalentCard2";
import TalentCard3 from "../../ui-component/cards/TalentCard3";
import { StyledPage } from "../../ui-component/StyledPage";

// Data for TalentCard1
const _popularServices1 = [
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
    bgColor: "#FFD700",
    buttonText: "ПИШИ СЕГА",
    buttonColor: "#5b84fa",
    personImages: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
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
    bgColor: "#FF6B35",
    buttonText: "Пиши за експертна помощ",
    buttonColor: "#6c757d",
    personImages: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    ],
    heartColor: "#8B4513",
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
    bgColor: "#4ECDC4",
    buttonText: "ПИШИ СЕГА",
    buttonColor: "#5b84fa",
    personImages: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
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
    bgColor: "#FFB6C1",
    buttonText: "Пиши за експертна помощ",
    buttonColor: "#6c757d",
    personImages: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
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

// Data for TalentCard2
const _popularServices2 = [
  {
    id: 5,
    title: "Видео Продукция",
    serviceName: "VIDEO",
    serviceType: "Видео",
    sellerName: "Елена Петрова",
    sellerLevel: "Ниво 3",
    sellerDescription:
      "Професионална видео продукция за вашия бизнес, маркетингови клипове и корпоративни филми с високо качество.",
    rating: 4.9,
    reviewCount: 156,
    price: 120,
    finishedProjects: 45,
    bgColor: "#9B59B6",
    buttonText: "ПИШИ СЕГА",
    buttonColor: "#5b84fa",
    personImages: [
      "https://images.unsplash.com/photo-1523473827534-86c15a0107d7?auto=format&fit=crop&w=400&q=80",
    ],
    heartColor: "#fff",
    userPicture:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    capabilities: [
      "Видео монтаж",
      "Видео продукция",
      "Анимация",
      "Корпоративни филми",
      "Рекламни клипове",
    ],
  },
  {
    id: 6,
    title: "Графичен Дизайн",
    serviceName: "DESIGN",
    serviceType: "Дизайн",
    sellerName: "Иван Георгиев",
    sellerLevel: "Високо Оценен",
    sellerDescription:
      "Създаване на професионални лога, брандинг, визитки и маркетингови материали за вашия бизнес.",
    rating: 4.8,
    reviewCount: 203,
    price: 88,
    finishedProjects: 127,
    bgColor: "#E74C3C",
    buttonText: "Пиши за експертна помощ",
    buttonColor: "#6c757d",
    personImages: [
      "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=400&q=80",
    ],
    heartColor: "#8B4513",
    userPicture:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    capabilities: [
      "Лого дизайн",
      "Брандинг",
      "Визитки",
      "Маркетингови материали",
      "Социални мрежи",
    ],
  },
  {
    id: 7,
    title: "SEO Оптимизация",
    serviceName: "SEO",
    serviceType: "Маркетинг",
    sellerName: "Мария Стоянова",
    sellerLevel: "Ниво 2",
    sellerDescription:
      "Подобряване на видимостта на вашия уебсайт в търсачките чрез професионална SEO оптимизация.",
    rating: 4.7,
    reviewCount: 94,
    price: 150,
    finishedProjects: 38,
    bgColor: "#3498DB",
    buttonText: "ПИШИ СЕГА",
    buttonColor: "#5b84fa",
    personImages: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    ],
    heartColor: "#fff",
    userPicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    capabilities: [
      "SEO оптимизация",
      "Ключови думи",
      "Линк билдинг",
      "Технически SEO",
      "Контент стратегия",
    ],
  },
  {
    id: 8,
    title: "Социални Мрежи",
    serviceName: "SMM",
    serviceType: "Маркетинг",
    sellerName: "Димитър Иванов",
    sellerLevel: "Ниво 1",
    sellerDescription:
      "Управление на социалните мрежи, създаване на съдържание и увеличаване на ангажираността.",
    rating: 4.6,
    reviewCount: 67,
    price: 75,
    finishedProjects: 52,
    bgColor: "#1ABC9C",
    buttonText: "Пиши за експертна помощ",
    buttonColor: "#6c757d",
    personImages: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    ],
    heartColor: "#8B4513",
    userPicture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    capabilities: [
      "Управление на профили",
      "Създаване на съдържание",
      "Реклами",
      "Анализ и отчети",
      "Стратегия",
    ],
  },
];

// Data for TalentCard3
const _popularServices3 = [
  {
    id: 9,
    title: "Фотография",
    serviceName: "PHOTO",
    serviceType: "Фотография",
    sellerName: "Анна Николова",
    sellerLevel: "Високо Оценен",
    sellerDescription:
      "Професионална фотография за продукти, портрети, събития и корпоративни нужди с високо качество.",
    rating: 4.9,
    reviewCount: 189,
    price: 110,
    finishedProjects: 89,
    bgColor: "#F39C12",
    buttonText: "ПИШИ СЕГА",
    buttonColor: "#5b84fa",
    personImages: [
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=400&q=80",
    ],
    heartColor: "#fff",
    userPicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    capabilities: [
      "Продуктова фотография",
      "Портрети",
      "Събития",
      "Корпоративна фотография",
      "Редактиране",
    ],
  },
  {
    id: 10,
    title: "Преводач",
    serviceName: "TRANSLATE",
    serviceType: "Преводач",
    sellerName: "Петър Димитров",
    sellerLevel: "Ниво 3",
    sellerDescription:
      "Професионални преводи на английски, немски, френски и други езици с гарантирано качество.",
    rating: 4.8,
    reviewCount: 142,
    price: 45,
    finishedProjects: 234,
    bgColor: "#16A085",
    buttonText: "Пиши за експертна помощ",
    buttonColor: "#6c757d",
    personImages: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    ],
    heartColor: "#8B4513",
    userPicture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    capabilities: [
      "Преводи",
      "Редактиране",
      "Коректура",
      "Локализация",
      "Технически преводи",
    ],
  },
  {
    id: 11,
    title: "Музика и Аудио",
    serviceName: "AUDIO",
    serviceType: "Музика",
    sellerName: "София Маркова",
    sellerLevel: "Ниво 2",
    sellerDescription:
      "Създаване на музика, джингъли, звукови ефекти и аудио продукция за вашия проект.",
    rating: 4.7,
    reviewCount: 78,
    price: 130,
    finishedProjects: 41,
    bgColor: "#E67E22",
    buttonText: "ПИШИ СЕГА",
    buttonColor: "#5b84fa",
    personImages: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
    ],
    heartColor: "#fff",
    userPicture:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    capabilities: [
      "Музикална композиция",
      "Джингъли",
      "Звукови ефекти",
      "Аудио монтаж",
      "Миксиране",
    ],
  },
  {
    id: 12,
    title: "Писане и Редактиране",
    serviceName: "WRITING",
    serviceType: "Писане",
    sellerName: "Георги Стоянов",
    sellerLevel: "Високо Оценен",
    sellerDescription:
      "Професионално писане на статии, блогове, копирайтинг и редакторски услуги за вашия бизнес.",
    rating: 4.9,
    reviewCount: 167,
    price: 55,
    finishedProjects: 156,
    bgColor: "#C0392B",
    buttonText: "Пиши за експертна помощ",
    buttonColor: "#6c757d",
    personImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
    ],
    heartColor: "#8B4513",
    userPicture:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    capabilities: [
      "Статии",
      "Блогове",
      "Копирайтинг",
      "Редактиране",
      "Коректура",
    ],
  },
];

export const HomePage = () => {
  return (
    <>
      <StyledPage>
        <Landing />
        <PopularCategories />
        <PopularServices TalentCard={TalentCard1} _popularServices={_popularServices1} />
        <PopularServices TalentCard={TalentCard2} _popularServices={_popularServices2} />
        <PopularServices TalentCard={TalentCard3} _popularServices={_popularServices3} />
        <CreatorsServices />
        <HowWorksSection />
        <PeopleSection />
        <JoinCommunity />
      </StyledPage>
    </>
  );
};

export default HomePage;

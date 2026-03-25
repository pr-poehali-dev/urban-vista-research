import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import {
  CheckCircle,
  FileText,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react"

interface ServiceCategory {
  id: string
  title: string
  color: string
  iconName: string
  services: ServiceItem[]
}

interface ServiceItem {
  service: string
  details: string
  isPersonalized?: boolean
}

const railwayServices: ServiceCategory[] = [
  {
    id: "track-monitoring",
    title: "Мониторинг и диагностика пути",
    color: "bg-blue-100 text-blue-800",
    iconName: "Activity",
    services: [
      { service: "Онлайн-мониторинг геометрии пути", details: "Непрерывный контроль просадок, перекосов и неровностей в режиме реального времени", isPersonalized: true },
      { service: "Дефектоскопия рельсов", details: "Выявление внутренних и поверхностных дефектов рельсов ультразвуковым и визуальным методами", isPersonalized: true },
      { service: "Диагностика земляного полотна", details: "Оценка состояния насыпей, выемок, дренажных сооружений" },
      { service: "Мониторинг стрелочных переводов", details: "Контроль состояния и работоспособности стрелок и крестовин", isPersonalized: true },
      { service: "Аналитика данных и отчётность", details: "Цифровые журналы осмотров, тренды износа, прогнозы ресурса", isPersonalized: true },
    ],
  },
  {
    id: "maintenance",
    title: "Текущее содержание пути",
    color: "bg-orange-100 text-orange-800",
    iconName: "Wrench",
    services: [
      { service: "Выправка и подбивка пути", details: "Восстановление проектного положения пути в плане и профиле", isPersonalized: true },
      { service: "Регулировка ширины колеи", details: "Контроль и приведение к норме ширины рельсовой колеи", isPersonalized: true },
      { service: "Очистка и замена балласта", details: "Механизированная очистка щебёночного балласта, добавка и выправка балластной призмы" },
      { service: "Подтягивание и замена скреплений", details: "Регулярный осмотр и замена изношенных болтов, клемм и подкладок" },
      { service: "Шлифовка рельсов", details: "Устранение волнообразного износа и поверхностных дефектов головки рельса" },
    ],
  },
  {
    id: "repair",
    title: "Ремонт пути",
    color: "bg-red-100 text-red-800",
    iconName: "Hammer",
    services: [
      { service: "Планово-предупредительный ремонт", details: "Организация и проведение среднего и подъёмочного ремонтов по нормативному циклу", isPersonalized: true },
      { service: "Замена рельсов и шпал", details: "Комплексная замена рельсошпальной решётки на участках с превышением нормативного износа", isPersonalized: true },
      { service: "Ремонт стрелочных переводов", details: "Полная разборка, дефектация и восстановление стрелочных переводов" },
      { service: "Усиление земляного полотна", details: "Устройство дренажа, берм, укрепление откосов и устранение деформаций" },
      { service: "Аварийно-восстановительные работы", details: "Оперативное устранение последствий отказов пути и восстановление движения", isPersonalized: true },
    ],
  },
  {
    id: "digital",
    title: "Цифровые технологии и ИТ-решения",
    color: "bg-green-100 text-green-800",
    iconName: "Monitor",
    services: [
      { service: "Цифровой паспорт пути", details: "Ведение электронных баз данных по всем объектам путевого хозяйства", isPersonalized: true },
      { service: "Система управления ремонтами (CMMS)", details: "Планирование, учёт и контроль путевых работ в единой информационной системе", isPersonalized: true },
      { service: "IoT-датчики и телематика", details: "Установка датчиков контроля нагрузок, вибраций и температуры на критичных участках" },
      { service: "Интеграция с системами управления движением", details: "Обмен данными с АСУ ТП и системами интервального регулирования" },
    ],
  },
  {
    id: "safety",
    title: "Безопасность и нормативное соответствие",
    color: "bg-yellow-100 text-yellow-800",
    iconName: "ShieldCheck",
    services: [
      { service: "Подготовка к инспекциям Ространснадзора", details: "Документирование состояния пути и устранение замечаний до плановых проверок", isPersonalized: true },
      { service: "Расследование нарушений безопасности", details: "Анализ причин отступлений, выработка корректирующих мероприятий" },
      { service: "Обучение и аттестация персонала", details: "Программы повышения квалификации монтёров пути и бригадиров" },
      { service: "Разработка регламентов и инструкций", details: "Адаптация нормативных документов под специфику конкретного участка" },
    ],
  },
  {
    id: "planning",
    title: "Стратегическое планирование",
    color: "bg-purple-100 text-purple-800",
    iconName: "BarChart3",
    services: [
      { service: "Разработка программы ремонтов", details: "Формирование пятилетней программы плановых ремонтов с учётом бюджета и приоритетов", isPersonalized: true },
      { service: "Технико-экономическое обоснование", details: "Оценка эффективности инвестиций в модернизацию путевой инфраструктуры" },
      { service: "Оптимизация ресурсов", details: "Рациональное распределение техники, материалов и персонала по «окнам»", isPersonalized: true },
    ],
  },
]

function ServiceCategoryCard({ category }: { category: ServiceCategory }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const personalizedCount = category.services.filter((s) => s.isPersonalized).length

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg rounded-2xl border-2"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Icon name={category.iconName} fallback="Settings" className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl leading-tight text-balance">{category.title}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {personalizedCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs font-semibold flex-shrink-0">
                {personalizedCount} для вас
              </Badge>
            )}
            <Badge className={`${category.color} text-xs font-semibold flex-shrink-0`}>
              {category.services.length} услуг
            </Badge>
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-4">
            {category.services.map((service, index) => (
              <div
                key={index}
                className={`border-l-4 pl-4 py-2 ${
                  service.isPersonalized ? "border-primary bg-primary/5" : "border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-semibold text-foreground text-base mb-1 flex-1">{service.service}</h5>
                  {service.isPersonalized && (
                    <Badge className="bg-primary text-primary-foreground text-xs font-semibold flex-shrink-0">
                      Для вас
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function ExecutiveSummaryCard() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card
      className="mb-8 sm:mb-12 cursor-pointer transition-all duration-200 hover:shadow-lg rounded-2xl border-2"
      id="executive-summary"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
            <CardTitle className="text-xl sm:text-2xl">Резюме</CardTitle>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          )}
        </div>
        <CardDescription className="text-base leading-relaxed">
          Ваша ситуация и ключевые направления сотрудничества
        </CardDescription>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-8">
          <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
            <p className="text-base text-foreground leading-relaxed">
              Вы управляете путевым хозяйством, где накопились задачи по диагностике, плановым ремонтам и переходу
              на цифровые методы контроля. Наша платформа позволяет систематизировать все процессы — от ежедневных
              осмотров до стратегического планирования ремонтной кампании — в единой среде, доступной всей команде.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground text-lg">Где вы сейчас</h4>
              <ul className="space-y-4 text-base text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Осмотры и дефектовки ведутся в бумажных журналах или разрозненных таблицах Excel
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Сложно планировать «окна» и контролировать выполнение работ в режиме реального времени
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Нет единой базы данных по дефектам, ремонтам и техническому состоянию объектов
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Подготовка к инспекциям Ространснадзора занимает много времени и сил
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground text-lg">На чём мы сфокусируемся вместе</h4>
              <ul className="space-y-4 text-base text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Переведём учёт дефектов и осмотров в цифровой формат — данные доступны в любой точке с телефона или планшета
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Создадим систему планирования ремонтов с контролем сроков, бюджетов и исполнителей
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Настроим автоматические уведомления при превышении нормативных параметров геометрии пути
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="TrendingUp" className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Обеспечим готовность документации к проверкам в один клик
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function TableOfContents() {
  const [activeSection, setActiveSection] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const sections = [
    { id: "team", label: "Команда" },
    { id: "executive-summary", label: "Резюме" },
    { id: "service-options", label: "Варианты услуг" },
    { id: "recommendations", label: "Модули платформы" },
    { id: "fees", label: "Стоимость" },
    { id: "onboarding", label: "Внедрение" },
    { id: "next-steps", label: "Следующие шаги" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsOpen(false)
    }
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background/95 backdrop-blur-sm shadow-lg"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <Card className="absolute top-16 right-4 w-52 bg-background shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Содержание</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 z-40">
        <Card className="w-44 bg-background/95 backdrop-blur-sm shadow-lg">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs text-muted-foreground uppercase tracking-wide">Содержание</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 px-3 pb-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left text-xs px-2 py-1.5 rounded transition-colors ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {section.label}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default function ClientProposal() {
  return (
    <div className="min-h-screen bg-background">
      <TableOfContents />

      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Icon name="Train" fallback="Zap" className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                  РЖД-Платформа
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Цифровое управление путевым хозяйством</p>
              </div>
            </div>
            <div className="text-left sm:text-right space-y-1 w-full sm:w-auto">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Москва, ул. Новая Басманная, 2</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+7 (495) 000-00-00</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@railway-platform.ru</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mt-4">
        {/* Hero */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="secondary" className="mb-4">
            Коммерческое предложение
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance leading-tight">
            Интернет-платформа для управления содержанием и ремонтом железнодорожного пути
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
            Цифровизация путевого хозяйства: от диагностики и мониторинга до планирования ремонтов и соответствия нормативным требованиям — всё в одной системе
          </p>
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Дата: 26 марта 2026</span>
            </div>
          </div>
        </div>

        {/* Team */}
        <Card className="mb-8 sm:mb-12" id="team">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl sm:text-2xl">
              <Users className="h-5 w-5 text-primary" />
              <span>Наша команда</span>
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Специалисты, которые обеспечат успешное внедрение платформы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-foreground text-base">Руководитель проекта</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Координация внедрения, взаимодействие с заказчиком</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-foreground text-base">Технический эксперт по пути</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Настройка нормативов, шаблонов осмотров и классификаторов дефектов</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-foreground text-base">Инженер по интеграции</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Подключение к существующим системам диспетчеризации и АСУ</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-foreground text-base">Аналитик данных</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Настройка отчётов, дашбордов и аналитики износа</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-foreground text-base">Служба поддержки</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Сопровождение пользователей 5/7, обучение персонала</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Executive Summary */}
        <ExecutiveSummaryCard />

        {/* Service Model Selection */}
        <Card className="mb-8 sm:mb-12" id="service-options">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Выберите подходящий вариант</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Три модели подключения под разные масштабы и потребности
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Базовый */}
              <div className="border rounded-lg p-6 space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-lg">Базовый</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Цифровой журнал осмотров и учёт дефектов без лишних настроек
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Для кого подходит</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Небольшие дистанции пути (ПЧ)
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Первый шаг к цифровизации
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Ограниченный бюджет на ИТ
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Что вы получите</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Мобильный журнал осмотров
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Реестр дефектов и их устранения
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Базовые отчёты для руководства
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        До 50 пользователей
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Не включено</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✕</span>Планирование ремонтов
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✕</span>Интеграция с АСУ
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Профессиональный — рекомендуем */}
              <div className="border-2 border-primary rounded-lg p-6 space-y-6 relative">
                <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground font-semibold">
                  РЕКОМЕНДУЕМ
                </Badge>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-lg">Профессиональный</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Полное управление содержанием и ремонтами в единой системе
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Для кого подходит</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Дистанции и службы пути среднего масштаба
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Нужен полный цикл — от осмотра до ремонта
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Требования к отчётности перед регулятором
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Что вы получите</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Всё из базового тарифа
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Планирование ремонтных «окон» и бригад
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Цифровой паспорт пути и объектов
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Аналитика износа и прогнозирование
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Готовая отчётность для Ространснадзора
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        До 200 пользователей
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Корпоративный */}
              <div className="border rounded-lg p-6 space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-lg">Корпоративный</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Масштабное внедрение на уровне дороги или холдинга</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Для кого подходит</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Дороги, управления и холдинги
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Нужна интеграция с корпоративными системами
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Что вы получите</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Всё из профессионального тарифа
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Интеграция с SAP, 1С, АСУ ТП
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Неограниченное число пользователей
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Выделенный менеджер поддержки
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        SLA 99,9% и развёртывание on-premise
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Примеры задач</h5>
                    <ul className="text-base text-muted-foreground space-y-3 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span>Единая система нескольких дистанций пути</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span>Цифровой двойник инфраструктуры</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span>Централизованное управление ремонтными кампаниями</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modules */}
        <div className="mb-8 sm:mb-12" id="recommendations">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            Модули платформы
          </h2>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            Платформа охватывает все процессы путевого хозяйства — от ежедневных осмотров до стратегического
            планирования. Нажмите на любой модуль, чтобы увидеть детали.
          </p>
          <div className="space-y-6">
            {railwayServices.map((category) => (
              <ServiceCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Fee Structure */}
        <Card className="mb-8 sm:mb-12" id="fees">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Стоимость подключения</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Прозрачная структура тарифов без скрытых платежей
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-lg">Структура тарифов</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Базовый (до 50 пользователей)</span>
                    <span className="text-sm font-semibold">от 150 000 ₽/год</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Профессиональный (до 200 пользователей)</span>
                    <span className="text-sm font-semibold">от 480 000 ₽/год</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Корпоративный (без ограничений)</span>
                    <span className="text-sm font-semibold">Индивидуально</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Внедрение и настройка (разово)</span>
                    <span className="text-sm font-semibold">от 80 000 ₽</span>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Включено в стоимость:</span> обновления платформы, техподдержка и обучение пользователей
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-lg">Как начать</h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Мы предлагаем бесплатный пилот на 30 дней для одной дистанции пути. За это время вы оцените
                  все возможности платформы, не принимая финансовых обязательств.
                </p>
                <a
                  href="mailto:info@railway-platform.ru"
                  className="inline-flex items-center justify-center w-full min-h-[48px] text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
                >
                  Запросить пилотный доступ
                </a>
              </div>
            </div>

            <div className="border-t pt-8">
              <h4 className="font-semibold text-foreground text-lg mb-6">Что входит в каждый тариф</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Мобильное приложение для осмотров</span>
                  <span className="text-sm font-semibold text-green-600">Все тарифы</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Реестр дефектов и устранений</span>
                  <span className="text-sm font-semibold text-green-600">Все тарифы</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Планирование ремонтных «окон»</span>
                  <span className="text-sm font-semibold">Проф. + Корп.</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Аналитика и прогнозирование</span>
                  <span className="text-sm font-semibold">Проф. + Корп.</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary/40 mt-4">
                  <span className="text-base font-semibold text-foreground">Интеграция с корпоративными системами</span>
                  <span className="text-base font-bold text-foreground">Корп.</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Onboarding */}
        <Card className="mb-8 sm:mb-12" id="onboarding">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Процесс внедрения</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Структурированный подход, который обеспечивает быстрый старт и минимум нагрузки на ваших специалистов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-10">
              {/* Phase 1 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Icon name="ClipboardList" fallback="FileText" className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Этап 1</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Обследование и настройка</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Изучаем вашу инфраструктуру, нормативы и бизнес-процессы. Настраиваем классификаторы дефектов,
                      шаблоны осмотров и справочники объектов под вашу специфику.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Загрузка схем и паспортов пути</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Настройка нормативных параметров</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
              </div>

              {/* Phase 2 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Этап 2</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Обучение персонала</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Проводим обучение для монтёров пути, бригадиров, инженеров и руководителей. Каждая роль
                      получает свой интерфейс и набор инструкций.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Очное и дистанционное обучение</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Видеоинструкции и база знаний</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
              </div>

              {/* Phase 3 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Icon name="Rocket" fallback="Zap" className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Этап 3</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Пилотный запуск</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Запускаем платформу на одном участке. Сопровождаем первые осмотры и планирование работ,
                      оперативно вносим коррективы по обратной связи от пользователей.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Сопровождение первых 30 дней</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Доработка под ваши процессы</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
              </div>

              {/* Phase 4 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Icon name="BarChart3" fallback="TrendingUp" className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Этап 4</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Масштабирование и развитие</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Подключаем остальные участки и дистанции, настраиваем интеграции, добавляем аналитику
                      и расширенные модули под растущие потребности.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Тиражирование на всю сеть</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Регулярные обновления платформы</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 sm:mb-12" id="next-steps">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Следующие шаги</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Готовы начать? Вот как выглядит путь к запуску
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground text-sm font-bold">1</span>
                  </div>
                  <div className="leading-relaxed pt-1">
                    <span className="font-semibold text-foreground">Демонстрация платформы:</span>{" "}
                    <span className="text-muted-foreground">Назначьте онлайн-встречу — покажем весь функционал на реальных данных за 1 час</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground text-sm font-bold">2</span>
                  </div>
                  <div className="leading-relaxed pt-1">
                    <span className="font-semibold text-foreground">Пилот 30 дней:</span>{" "}
                    <span className="text-muted-foreground">Запускаем бесплатный пилот на вашем участке, настраиваем под ваши процессы</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground text-sm font-bold">3</span>
                  </div>
                  <div className="leading-relaxed pt-1">
                    <span className="font-semibold text-foreground">Договор и внедрение:</span>{" "}
                    <span className="text-muted-foreground">Подписываем договор и запускаем полное внедрение — от 4 недель</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="mailto:info@railway-platform.ru"
                  className="inline-flex items-center justify-center min-h-[48px] text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-2 transition-colors flex-1"
                >
                  Записаться на демонстрацию
                </a>
                <a
                  href="tel:+74950000000"
                  className="inline-flex items-center justify-center min-h-[48px] text-base font-semibold border-2 border-primary text-primary hover:bg-primary/5 rounded-md px-6 py-2 transition-colors flex-1"
                >
                  Позвонить нам
                </a>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="leading-relaxed">
                    <span className="font-semibold text-foreground">Договор:</span>{" "}
                    <span className="text-muted-foreground">Направим договор и техническое задание для согласования</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 mt-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="leading-relaxed">
                    <span className="font-semibold text-foreground">Сроки:</span>{" "}
                    <span className="text-muted-foreground">Полное внедрение занимает 4–8 недель в зависимости от масштаба</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="text-center space-y-2">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Данное предложение действительно 30 дней с момента получения.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Подготовлено командой РЖД-Платформа · info@railway-platform.ru · +7 (495) 000-00-00
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Дополнительные материалы</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Ресурсы для принятия решения и начала работы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Кейсы внедрений</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Примеры успешного внедрения платформы на различных дистанциях пути: результаты, сроки и экономический эффект
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Интеграции</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Платформа интегрируется с популярными системами:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>- SAP PM / ERP</li>
                    <li>- 1С:ТОиР</li>
                    <li>- АСУ ТП и SCADA</li>
                    <li>- Системы диспетчеризации</li>
                    <li>- ГИС-системы</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Обновления платформы</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Подпишитесь на рассылку об обновлениях платформы, новых модулях и изменениях в нормативной базе.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Соответствие требованиям</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Платформа разработана в соответствии с требованиями ПТЭ, приказов Минтранса и методических указаний
                    по техническому содержанию пути.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Остались вопросы?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Наши эксперты готовы ответить на любые вопросы по технической части и условиям сотрудничества.
                  </p>
                  <a
                    href="mailto:info@railway-platform.ru"
                    className="inline-flex items-center justify-center w-full min-h-[40px] text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
                  >
                    Написать нам
                  </a>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">База знаний</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Документация, видеоуроки и ответы на часто задаваемые вопросы по работе с платформой.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-full min-h-[40px] text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
                  >
                    Открыть документацию
                  </a>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

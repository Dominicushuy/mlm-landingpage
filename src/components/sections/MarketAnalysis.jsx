import React, { forwardRef, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Grid, GridItem } from "../layout/container";
import { Card, CardContent, CardTitle } from "../ui/card";
import { BarChart, LineChart } from "../charts/chart-components";
import { marketGrowthData } from "../../data/siteData";
import {
  Check,
  TrendingUp,
  TrendingDown,
  Globe,
  BarChart2,
  Target,
} from "lucide-react";

const MarketAnalysis = forwardRef(({ isVisible }, ref) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Card hover effect preserved (no loading animations)
  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <Section
      id="market"
      ref={(node) => {
        ref.current = node;
        sectionRef.current = node;
      }}
      variant="default"
      isVisible={isVisible}
      container
      className="relative overflow-hidden"
    >
      {/* Simplified static background elements */}
      <SimpleBackgroundElements />

      <div className="relative z-10">
        <SectionHeader>
          <div className="inline-block mb-3">
            <div className="flex items-center space-x-2 mb-2 bg-blue-100/80 backdrop-blur-sm dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium border border-blue-200/50 dark:border-blue-800/50">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Marketing Intelligence</span>
            </div>
          </div>
          <SectionSubtitle>Phân tích thị trường</SectionSubtitle>
          <SectionTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Thị trường MLM và xu hướng
          </SectionTitle>
          <SectionDescription>
            Tìm hiểu về sự phát triển của thị trường MLM toàn cầu và tại Việt
            Nam, cùng với các xu hướng mới nhất.
          </SectionDescription>
        </SectionHeader>

        <Grid cols={2} gap="lg" className="mt-12">
          <GridItem>
            {/* Global market card - hover effect preserved */}
            <div
              onMouseEnter={() => handleCardHover("global")}
              onMouseLeave={handleCardLeave}
              className="h-full transform transition-transform duration-300 hover:scale-[1.02]"
            >
              <Card
                variant="default"
                className="h-full relative overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-lg"
              >
                {/* Card decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-400/10 to-purple-500/10 rounded-full blur-lg"></div>

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                      <Globe className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      Thị trường toàn cầu
                    </CardTitle>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Mô hình MLM góp phần đáng kể vào tổng doanh thu toàn cầu với
                    các công ty lớn như Amway, Herbalife và Natura &Co. Tuy
                    nhiên, thị trường đang đối mặt với sự cạnh tranh mạnh mẽ từ
                    thương mại điện tử.
                  </p>

                  <div className="h-64 relative">
                    {/* Chart background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-lg"></div>
                    <BarChart
                      data={marketGrowthData}
                      bars={[
                        { dataKey: "mlm", name: "Doanh thu MLM (tỷ USD)" },
                      ]}
                      xAxisKey="year"
                    />
                  </div>

                  <div className="mt-6 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg">
                    <div className="flex items-center">
                      <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        Giảm 3,2% trong năm 2023 so với năm trước
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </GridItem>

          <GridItem>
            {/* Vietnam market card - hover effect preserved */}
            <div
              onMouseEnter={() => handleCardHover("vietnam")}
              onMouseLeave={handleCardLeave}
              className="h-full transform transition-transform duration-300 hover:scale-[1.02]"
            >
              <Card
                variant="default"
                className="h-full relative overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-lg"
              >
                {/* Card decorative elements */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tr from-green-400/10 to-blue-500/10 rounded-full blur-lg"></div>

                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3">
                      <Target className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      Thị trường Việt Nam
                    </CardTitle>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Tại Việt Nam, mô hình MLM đang có nhiều tiềm năng phát triển
                    với dân số trẻ, tiếp cận công nghệ cao và sự thay đổi về
                    thói quen tiêu dùng.
                  </p>

                  <div className="space-y-4 mt-4">
                    {[
                      {
                        title: "Tiềm năng tăng trưởng",
                        description:
                          "Thị trường Việt Nam có tiềm năng tăng trưởng rất lớn với dân số trẻ, am hiểu công nghệ.",
                        icon: TrendingUp,
                        color: "green",
                      },
                      {
                        title: "Thách thức pháp lý",
                        description:
                          "Cần tuân thủ các quy định pháp luật và đảm bảo tính minh bạch trong hoạt động.",
                        icon: BarChart2,
                        color: "orange",
                      },
                      {
                        title: "Nhu cầu số hóa",
                        description:
                          "Việc ứng dụng công nghệ trong quản lý và tiếp thị đang trở thành nhu cầu thiết yếu.",
                        icon: Globe,
                        color: "blue",
                      },
                    ].map((feature, index) => (
                      <MarketFeatureEnhanced
                        key={index}
                        feature={feature}
                        index={index}
                      />
                    ))}
                  </div>

                  <div className="mt-6 px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        Dự kiến tăng trưởng 15% trong các năm tới
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </GridItem>
        </Grid>

        <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <BarChart2 className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-bold">Xu hướng thị trường</h3>
            </div>
            <p className="mb-6">
              Sự kết hợp giữa MLM truyền thống và công nghệ Marketing Automation
              đang tạo ra làn sóng chuyển đổi mới trong ngành.
            </p>

            <Grid cols={3} gap="md">
              {[
                {
                  stat: "85%",
                  label: "Doanh nghiệp MLM cần tích hợp công nghệ mới",
                },
                {
                  stat: "63%",
                  label: "Nhà phân phối sử dụng các giải pháp tự động",
                },
                {
                  stat: "47%",
                  label: "Tăng trưởng các công cụ marketing automation",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold mb-1">{item.stat}</p>
                  <p className="text-sm opacity-80">{item.label}</p>
                </div>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </Section>
  );
});

// Enhanced Market Feature component with hover animation preserved
const MarketFeatureEnhanced = ({ feature, index }) => {
  const { title, description, icon: Icon, color } = feature;

  // Colors based on feature type
  const colors = {
    green: {
      border: "border-green-500 dark:border-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-700 dark:text-green-400",
    },
    blue: {
      border: "border-blue-500 dark:border-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-700 dark:text-blue-400",
    },
    orange: {
      border: "border-orange-500 dark:border-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-700 dark:text-orange-400",
    },
  };

  return (
    <motion.div
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
      className={`border-l-4 pl-4 py-3 ${colors[color].border} ${colors[color].bg} rounded-r-lg`}
    >
      <div className="flex items-center">
        <Icon className={`h-5 w-5 mr-2 ${colors[color].text}`} />
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
        {description}
      </p>
    </motion.div>
  );
};

// Simplified static background
const SimpleBackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static gradient circles with minimal opacity */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-600/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-600/5 blur-3xl -z-10"></div>

      {/* A few static particles for minimal decoration */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-blue-500/5 dark:bg-blue-400/5 rounded-full -z-20"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

MarketAnalysis.displayName = "MarketAnalysis";

export default MarketAnalysis;

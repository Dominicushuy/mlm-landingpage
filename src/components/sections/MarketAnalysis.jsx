import React, { forwardRef, useRef } from "react";
import { motion } from "framer-motion";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  EnhancedBarChart,
  EnhancedLineChart,
  KpiCard,
  DashboardGrid,
} from "../charts/chart-components";
import { marketGrowthData } from "../../data/siteData";
import {
  TrendingUp,
  TrendingDown,
  Globe,
  BarChart2,
  Target,
  Users,
  Activity,
  ArrowRight,
} from "lucide-react";

const MarketAnalysis = forwardRef(({ isVisible }, ref) => {
  const sectionRef = useRef(null);

  // Tính toán dữ liệu thị trường Việt Nam từ marketGrowthData
  const vietnamMarketData = marketGrowthData.map((item) => ({
    year: item.year,
    mlm: (item.mlm * 0.015).toFixed(1), // 1.5% của thị trường toàn cầu
    ecommerce: (item.ecommerce * 0.012).toFixed(1), // 1.2% của thị trường toàn cầu
  }));

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
      {/* Simplified static background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-500/10 dark:from-blue-500/5 dark:to-indigo-600/5 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-600/5 blur-3xl -z-10"></div>
      </div>

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

        {/* Market Stats */}
        <DashboardGrid columns={4} className="mt-8 mb-12">
          <KpiCard
            title="Quy mô thị trường MLM toàn cầu"
            value={marketGrowthData[marketGrowthData.length - 1].mlm}
            suffix="B USD"
            previousValue={marketGrowthData[marketGrowthData.length - 2].mlm}
            change={
              (marketGrowthData[marketGrowthData.length - 1].mlm /
                marketGrowthData[marketGrowthData.length - 2].mlm -
                1) *
              100
            }
            icon={<Globe className="h-5 w-5" />}
            color="blue"
          />

          <KpiCard
            title="Tăng trưởng TMĐT"
            value="12.1"
            suffix="%"
            previousValue={9.8}
            change={2.3}
            icon={<TrendingUp className="h-5 w-5" />}
            color="green"
          />

          <KpiCard
            title="Số lượng người tham gia"
            value="118.4"
            suffix="M"
            previousValue={116.7}
            change={1.7}
            icon={<Users className="h-5 w-5" />}
            color="purple"
          />

          <KpiCard
            title="Tỷ lệ áp dụng công nghệ"
            value="63"
            suffix="%"
            previousValue={48}
            change={15}
            icon={<Activity className="h-5 w-5" />}
            color="orange"
          />
        </DashboardGrid>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Global market card - simplified */}
          <Card className="border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                  <Globe className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Thị trường toàn cầu
                </CardTitle>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Mô hình MLM góp phần đáng kể vào tổng doanh thu toàn cầu với các
                công ty lớn như Amway, Herbalife và Natura &Co. Tuy nhiên, thị
                trường đang đối mặt với sự cạnh tranh mạnh mẽ từ thương mại điện
                tử.
              </p>

              <div className="h-72">
                <EnhancedBarChart
                  data={marketGrowthData}
                  bars={[
                    {
                      dataKey: "mlm",
                      name: "MLM (tỷ USD)",
                      color: "#3b82f6",
                      barSize: 40,
                    },
                    {
                      dataKey: "ecommerce",
                      name: "E-commerce (tỷ USD)",
                      color: "#38bdf8",
                      barSize: 40,
                    },
                  ]}
                  xAxisKey="year"
                  animate={false}
                  height={250}
                  formatters={{
                    valueFormatter: (value) => `${value}B`,
                  }}
                  stackBars={false}
                  layout="horizontal"
                />
              </div>

              <div className="mt-4 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg">
                <div className="flex items-center">
                  <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    MLM giảm{" "}
                    {(
                      ((marketGrowthData[marketGrowthData.length - 2].mlm -
                        marketGrowthData[marketGrowthData.length - 1].mlm) /
                        marketGrowthData[marketGrowthData.length - 2].mlm) *
                      100
                    ).toFixed(1)}
                    % trong năm 2023 so với năm trước
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vietnam market card - simplified */}
          <Card className="border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mr-3">
                  <Target className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Thị trường Việt Nam
                </CardTitle>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Tại Việt Nam, mô hình MLM đang có nhiều tiềm năng phát triển với
                dân số trẻ, tiếp cận công nghệ cao và sự thay đổi về thói quen
                tiêu dùng.
              </p>

              <div className="h-72">
                <EnhancedLineChart
                  data={vietnamMarketData}
                  lines={[
                    {
                      dataKey: "mlm",
                      name: "MLM (tỷ USD)",
                      color: "#6366f1",
                      strokeWidth: 3,
                    },
                    {
                      dataKey: "ecommerce",
                      name: "E-commerce (tỷ USD)",
                      color: "#a855f7",
                      strokeWidth: 3,
                    },
                  ]}
                  xAxisKey="year"
                  animate={true}
                  height={250}
                  formatters={{
                    valueFormatter: (value) => `$${value}B`,
                  }}
                />
              </div>

              <div className="mt-4 px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    MLM tại Việt Nam dự kiến tăng trưởng 15% trong các năm tới
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Trends - Simplified and cleaner */}
        <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg relative overflow-hidden">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <div
                  key={i}
                  className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"
                >
                  <p className="text-3xl font-bold mb-1">{item.stat}</p>
                  <p className="text-sm opacity-80">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <motion.div
                className="inline-flex items-center text-sm font-medium bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full cursor-pointer transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Khám phá giải pháp tự động hóa</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

MarketAnalysis.displayName = "MarketAnalysis";

export default MarketAnalysis;

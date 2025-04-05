import React, { forwardRef } from "react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Container, Grid, GridItem } from "../layout/container";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { BarChart } from "../charts/chart-components";
import { marketGrowthData } from "../../data/siteData";

const MarketAnalysis = forwardRef(({ isVisible }, ref) => {
  return (
    <Section
      id="market"
      ref={ref}
      variant="default"
      isVisible={isVisible}
      animation="fade-in"
      container
    >
      <SectionHeader>
        <SectionSubtitle>Phân tích thị trường</SectionSubtitle>
        <SectionTitle>Thị trường MLM và xu hướng</SectionTitle>
        <SectionDescription>
          Tìm hiểu về sự phát triển của thị trường MLM toàn cầu và tại Việt Nam,
          cùng với các xu hướng mới nhất.
        </SectionDescription>
      </SectionHeader>

      <Grid cols={2} gap="lg">
        <GridItem>
          <Card variant="filled" className="h-full">
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Thị trường toàn cầu
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Mô hình MLM góp phần đáng kể vào tổng doanh thu toàn cầu với các
                công ty lớn như Amway, Herbalife và Natura &Co. Tuy nhiên, thị
                trường đang đối mặt với sự cạnh tranh mạnh mẽ từ thương mại điện
                tử.
              </p>
              <div className="h-64">
                <BarChart
                  data={marketGrowthData}
                  bars={[{ dataKey: "mlm", name: "Doanh thu MLM (tỷ USD)" }]}
                  xAxisKey="year"
                />
              </div>
            </CardContent>
          </Card>
        </GridItem>

        <GridItem>
          <Card variant="filled" className="h-full">
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Thị trường Việt Nam
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Tại Việt Nam, mô hình MLM đang có nhiều tiềm năng phát triển với
                dân số trẻ, tiếp cận công nghệ cao và sự thay đổi về thói quen
                tiêu dùng.
              </p>
              <div className="space-y-4 mt-4">
                <MarketFeature
                  title="Tiềm năng tăng trưởng"
                  description="Thị trường Việt Nam có tiềm năng tăng trưởng rất lớn với dân số trẻ, am hiểu công nghệ."
                />
                <MarketFeature
                  title="Thách thức pháp lý"
                  description="Cần tuân thủ các quy định pháp luật và đảm bảo tính minh bạch trong hoạt động."
                />
                <MarketFeature
                  title="Nhu cầu số hóa"
                  description="Việc ứng dụng công nghệ trong quản lý và tiếp thị đang trở thành nhu cầu thiết yếu."
                />
              </div>
            </CardContent>
          </Card>
        </GridItem>
      </Grid>
    </Section>
  );
});

// Helper component
const MarketFeature = ({ title, description }) => (
  <div className="border-l-4 border-blue-500 pl-4 py-2">
    <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

MarketAnalysis.displayName = "MarketAnalysis";

export default MarketAnalysis;

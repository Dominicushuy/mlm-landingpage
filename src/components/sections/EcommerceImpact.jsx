import React, { forwardRef } from "react";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  SectionDescription,
} from "../layout/section";
import { Container, Grid, GridItem } from "../layout/container";
import { Card, CardContent, CardTitle } from "../ui/card";
import { LineChart } from "../charts/chart-components";
import { FeatureCard } from "../features/feature-card";
import { marketGrowthData } from "../../data/siteData";
import { Zap, DollarSign, Settings } from "lucide-react";

const EcommerceImpact = forwardRef(({ isVisible }, ref) => {
  return (
    <Section
      id="ecommerce"
      ref={ref}
      variant="gradient"
      isVisible={isVisible}
      animation="fade-in"
      container
    >
      <SectionHeader>
        <SectionSubtitle>Tác động TMĐT</SectionSubtitle>
        <SectionTitle>Thương mại điện tử thay đổi MLM</SectionTitle>
        <SectionDescription>
          Tác động của thương mại điện tử đến mô hình kinh doanh đa cấp truyền
          thống
        </SectionDescription>
      </SectionHeader>

      <Grid cols={2} gap="lg" className="items-center">
        <GridItem>
          <Card variant="default" className="shadow-lg">
            <CardContent className="p-6">
              <div className="h-80">
                <LineChart
                  data={marketGrowthData}
                  lines={[
                    { dataKey: "mlm", name: "Thị trường MLM (tỷ USD)" },
                    {
                      dataKey: "ecommerce",
                      name: "Thương mại điện tử (tỷ USD)",
                      color: "#ef4444",
                    },
                  ]}
                  xAxisKey="year"
                />
              </div>
              <div className="mt-6 text-center text-gray-500 dark:text-gray-400 italic">
                So sánh tăng trưởng thị trường MLM và thương mại điện tử toàn
                cầu
              </div>
            </CardContent>
          </Card>
        </GridItem>

        <GridItem>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Những thách thức mới
            </h3>

            <FeatureCard
              icon={Zap}
              title="Mất đi yếu tố tương tác trực tiếp"
              description="Mô hình MLM vốn dựa vào sự tương tác trực tiếp giữa người
                bán hàng và khách hàng, điều này có thể bị suy yếu khi
                dịch chuyển sang nền tảng trực tuyến."
              variant="default"
              iconBg="solid"
              iconPosition="left"
            />

            <FeatureCard
              icon={DollarSign}
              title="Sự cạnh tranh tăng cao"
              description="Khi thị trường chuyển sang hình thức bán hàng trực tuyến,
                số lượng các đối thủ cạnh tranh tăng lên rõ rệt, đặc biệt
                là từ các doanh nghiệp chuyên nghiệp."
              variant="default"
              iconBg="solid"
              iconPosition="left"
            />

            <FeatureCard
              icon={Settings}
              title="Thay đổi hành vi người tiêu dùng"
              description="Người tiêu dùng ngày nay ưa chuộng sự tiện lợi và cá nhân
                hoá trong trải nghiệm mua sắm, đòi hỏi các mô hình MLM
                phải thích nghi."
              variant="default"
              iconBg="solid"
              iconPosition="left"
            />
          </div>
        </GridItem>
      </Grid>
    </Section>
  );
});

EcommerceImpact.displayName = "EcommerceImpact";

export default EcommerceImpact;

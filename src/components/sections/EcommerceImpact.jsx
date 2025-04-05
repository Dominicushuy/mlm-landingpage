import React, { forwardRef } from "react";
import SectionHeading from "../ui/SectionHeading";
import LineChartComponent from "../charts/LineChartComponent";
import { marketGrowthData } from "../../data/siteData";
import { Zap, DollarSign, Settings } from "lucide-react";

const EcommerceImpact = forwardRef(({ isVisible }, ref) => {
  return (
    <section
      id="ecommerce"
      ref={ref}
      className={`py-24 bg-gradient-to-r from-blue-50 to-indigo-50 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Tác động TMĐT"
          title="Thương mại điện tử thay đổi MLM"
          description="Tác động của thương mại điện tử đến mô hình kinh doanh đa cấp truyền thống"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="h-80">
              <LineChartComponent
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
            <div className="mt-6 text-center text-gray-500 italic">
              So sánh tăng trưởng thị trường MLM và thương mại điện tử toàn cầu
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Những thách thức mới
            </h3>

            <div className="space-y-6">
              <ChallengeItem
                icon={Zap}
                title="Mất đi yếu tố tương tác trực tiếp"
                description="Mô hình MLM vốn dựa vào sự tương tác trực tiếp giữa người
                  bán hàng và khách hàng, điều này có thể bị suy yếu khi
                  dịch chuyển sang nền tảng trực tuyến."
              />

              <ChallengeItem
                icon={DollarSign}
                title="Sự cạnh tranh tăng cao"
                description="Khi thị trường chuyển sang hình thức bán hàng trực tuyến,
                  số lượng các đối thủ cạnh tranh tăng lên rõ rệt, đặc biệt
                  là từ các doanh nghiệp chuyên nghiệp."
              />

              <ChallengeItem
                icon={Settings}
                title="Thay đổi hành vi người tiêu dùng"
                description="Người tiêu dùng ngày nay ưa chuộng sự tiện lợi và cá nhân
                  hoá trong trải nghiệm mua sắm, đòi hỏi các mô hình MLM
                  phải thích nghi."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Helper component
const ChallengeItem = ({ icon: Icon, title, description }) => (
  <div className="flex">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
        <Icon className="h-6 w-6" />
      </div>
    </div>
    <div className="ml-4">
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  </div>
);

EcommerceImpact.displayName = "EcommerceImpact";

export default EcommerceImpact;

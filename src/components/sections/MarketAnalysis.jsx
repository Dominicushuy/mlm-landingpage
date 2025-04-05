import React, { forwardRef } from "react";
import SectionHeading from "../ui/SectionHeading";
import BarChartComponent from "../charts/BarChartComponent";
import { marketGrowthData } from "../../data/siteData";

const MarketAnalysis = forwardRef(({ isVisible }, ref) => {
  return (
    <section
      id="market"
      ref={ref}
      className={`py-24 bg-white transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Phân tích thị trường"
          title="Thị trường MLM và xu hướng"
          description="Tìm hiểu về sự phát triển của thị trường MLM toàn cầu và tại Việt
              Nam, cùng với các xu hướng mới nhất."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Thị trường toàn cầu
              </h3>
              <p className="text-gray-600 mb-6">
                Mô hình MLM góp phần đáng kể vào tổng doanh thu toàn cầu với các
                công ty lớn như Amway, Herbalife và Natura &Co. Tuy nhiên, thị
                trường đang đối mặt với sự cạnh tranh mạnh mẽ từ thương mại điện
                tử.
              </p>
              <div className="h-64">
                <BarChartComponent
                  data={marketGrowthData}
                  bars={[{ dataKey: "mlm", name: "Doanh thu MLM (tỷ USD)" }]}
                  xAxisKey="year"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Thị trường Việt Nam
              </h3>
              <p className="text-gray-600 mb-6">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Helper component
const MarketFeature = ({ title, description }) => (
  <div className="border-l-4 border-blue-500 pl-4 py-2">
    <h4 className="font-semibold text-gray-900">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

MarketAnalysis.displayName = "MarketAnalysis";

export default MarketAnalysis;

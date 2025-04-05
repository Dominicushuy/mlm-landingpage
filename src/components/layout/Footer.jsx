import React from "react";
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl font-bold mb-4">
              MA<span className="text-blue-400">MLM</span>
            </div>
            <p className="text-gray-400">
              Nền tảng Marketing Automation toàn diện cho mô hình kinh doanh đa
              cấp trong kỷ nguyên số.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Giải pháp</h3>
            <ul className="space-y-2">
              <FooterLink text="Quản lý liên hệ" href="#" />
              <FooterLink text="Email Marketing" href="#" />
              <FooterLink text="Quản lý hoa hồng" href="#" />
              <FooterLink text="Phân tích dữ liệu" href="#" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Công ty</h3>
            <ul className="space-y-2">
              <FooterLink text="Về chúng tôi" href="#" />
              <FooterLink text="Đối tác" href="#" />
              <FooterLink text="Tuyển dụng" href="#" />
              <FooterLink text="Tin tức" href="#" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <ContactItem icon={Phone} text="+84 123 456 789" />
              <ContactItem icon={Mail} text="info@mamlm.vn" />
              <ContactItem
                icon={MapPin}
                text="Tầng 15, Tòa nhà Landmark 81, TP HCM"
              />
            </ul>
            <div className="flex gap-4 mt-6">
              <SocialLink icon={Facebook} label="Facebook" />
              <SocialLink icon={Linkedin} label="LinkedIn" />
              <SocialLink icon={Twitter} label="Twitter" />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 MAMLM. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ text, href }) => (
  <li>
    <a href={href} className="text-gray-400 hover:text-white transition-colors">
      {text}
    </a>
  </li>
);

const ContactItem = ({ icon: Icon, text }) => (
  <li className="flex items-start">
    <Icon className="h-5 w-5 text-blue-400 mt-1 mr-2" />
    <span className="text-gray-400">{text}</span>
  </li>
);

const SocialLink = ({ icon: Icon, label }) => (
  <a
    href="#"
    className="text-gray-400 hover:text-white transition-colors"
    aria-label={label}
  >
    <span className="sr-only">{label}</span>
    <Icon className="h-6 w-6" />
  </a>
);

export default Footer;

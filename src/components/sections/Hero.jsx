import React, { forwardRef, useEffect, useState } from "react";
import { Check, ArrowRight, PlusCircle } from "lucide-react";
import { Section } from "../layout/section";
import { MainSection } from "../layout/MainLayout";
import { Container, Grid, GridItem, Flex } from "../layout/container";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ResponsiveCard } from "../ui/ResponsiveCard";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "../ui/modal";
import { Input, FormItem, FormLabel } from "../ui/input";

const Hero = forwardRef(({ isVisible, scrollToSection, darkMode }, ref) => {
  const [typedText, setTypedText] = useState("");
  const fullText = "dành cho MLM";
  const [showDemo, setShowDemo] = useState(false);

  // Typing effect
  useEffect(() => {
    if (isVisible) {
      let i = 0;
      const typing = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
        }
      }, 100);
      return () => clearInterval(typing);
    }
  }, [isVisible]);

  return (
    <Section
      id="intro"
      ref={ref}
      variant={darkMode ? "gradient" : "default"}
      className="min-h-[90vh] flex items-center relative overflow-hidden"
      isVisible={isVisible}
      animation="fade-in"
    >
      {/* Decorative elements - Fixed positions for better stability */}
      <BackgroundDecorations />

      <Container>
        <Grid cols={1} md={2} gap="lg" className="py-12 md:py-24 items-center">
          <GridItem>
            <div className="space-y-6 transform transition-all duration-700 translate-y-0">
              <div className="inline-block">
                <div className="flex items-center space-x-2 mb-4 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span>Kỷ nguyên mới của Marketing Automation</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-800 dark:text-blue-300 leading-tight">
                Marketing{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  Automation
                </span>
                <br />
                <span className="relative">
                  <span className="mr-1">{typedText}</span>
                  <span
                    className={`absolute w-0.5 h-8 bg-blue-600 dark:bg-blue-400 -right-1 bottom-1 ${
                      typedText === fullText ? "animate-blink" : "opacity-0"
                    }`}
                  ></span>
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl">
                Chuyển đổi số và tự động hóa tiếp thị cho mô hình kinh doanh đa
                cấp trong kỷ nguyên thương mại điện tử.
              </p>

              <div className="space-y-4 pt-2">
                <FeatureCheckItem text="Tăng hiệu quả hoạt động và doanh thu" />
                <FeatureCheckItem text="Cá nhân hoá trải nghiệm khách hàng" />
                <FeatureCheckItem text="Tăng cường minh bạch trong quản lý" />
              </div>

              <Flex gap="sm" className="pt-4">
                <Button
                  onClick={() => scrollToSection("invest")}
                  variant="default"
                  className="transform hover:-translate-y-1 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Tìm hiểu về đầu tư
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </Button>

                <Button
                  onClick={() => setShowDemo(!showDemo)}
                  variant="outline"
                  className="hover:bg-white/10 transition-all duration-300"
                >
                  Xem demo
                  <PlusCircle className="ml-2 -mr-1 h-5 w-5" />
                </Button>
              </Flex>
            </div>
          </GridItem>

          <GridItem className="hidden md:block">
            <ResponsiveCard
              variant="elevated"
              className="transform transition-all duration-700 hover:scale-105 shadow-xl"
            >
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-800 dark:to-blue-600 p-8 text-white">
                  <h2 className="text-2xl font-bold mb-6">
                    Chúng tôi mang đến giải pháp
                  </h2>
                  <div className="space-y-4">
                    <SolutionItem text="Tự động hóa quản lý liên hệ và CRM" />
                    <SolutionItem text="Tự động hóa Email Marketing và nuôi dưỡng khách hàng" />
                    <SolutionItem text="Tự động hóa quản lý hoa hồng và lợi ích" />
                    <SolutionItem text="Tích hợp công cụ phân tích dữ liệu (BI) và báo cáo" />
                    <SolutionItem text="Tự động hóa phân phối thông báo qua đa kênh" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8">
                  <ProgressBar
                    label="Tiết kiệm thời gian & nguồn lực"
                    value={85}
                  />
                  <ProgressBar label="Tăng hiệu quả marketing" value={78} />
                  <ProgressBar
                    label="Cải thiện trải nghiệm khách hàng"
                    value={82}
                  />
                </div>
              </CardContent>
            </ResponsiveCard>
          </GridItem>
        </Grid>
      </Container>

      {/* Demo Modal using the Modal component from our design system */}
      <Modal open={showDemo} onClose={() => setShowDemo(false)} size="lg">
        <ModalContent>
          <ModalCloseButton onClick={() => setShowDemo(false)} />
          <ModalHeader>
            <ModalTitle>Demo Marketing Automation</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                Nhập email của bạn để xem cách Marketing Automation hoạt động.
                Bạn sẽ nhận được một chuỗi email tự động thể hiện quy trình nuôi
                dưỡng khách hàng.
              </p>
            </div>

            <form className="space-y-4">
              <FormItem>
                <FormLabel htmlFor="email">Địa chỉ email</FormLabel>
                <Input type="email" id="email" placeholder="you@example.com" />
              </FormItem>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="default" className="px-6">
              Bắt đầu Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Section>
  );
});

// Background decorations component
const BackgroundDecorations = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
    <div className="absolute top-1/3 -left-24 w-72 h-72 bg-indigo-500 opacity-10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
  </div>
);

// Helper components for cleaner code
const FeatureCheckItem = ({ text }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
      <Check className="h-4 w-4" />
    </div>
    <p className="text-lg text-gray-600 dark:text-gray-300">{text}</p>
  </div>
);

const SolutionItem = ({ text }) => (
  <div className="flex items-center">
    <div className="flex-shrink-0 h-5 w-5 mr-3">
      <Check />
    </div>
    <p>{text}</p>
  </div>
);

const ProgressBar = ({ label, value }) => (
  <div className="text-center mt-6 first:mt-0">
    <p className="text-gray-500 dark:text-gray-400 mb-2">{label}</p>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
      <div
        className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${value}%`, transitionDelay: "300ms" }}
      ></div>
    </div>
    <p className="text-sm text-right text-gray-500 dark:text-gray-400 mt-1">
      {value}%
    </p>
  </div>
);

Hero.displayName = "Hero";

export default Hero;

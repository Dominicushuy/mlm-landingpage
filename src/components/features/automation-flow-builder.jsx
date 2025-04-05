import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input, FormItem, FormLabel } from "../ui/input";
import { cn } from "../../lib/utils";
import {
  MailPlus,
  Clock,
  Filter,
  MessageSquare,
  Users,
  UserPlus,
  Send,
  Settings,
  Tag,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";

/**
 * Flow builder component for creating marketing automation workflows
 */
const AutomationFlowBuilder = ({ className }) => {
  const [steps, setSteps] = useState([
    { id: 1, type: "trigger", name: "Start", icon: MailPlus },
    {
      id: 2,
      type: "delay",
      name: "Wait 1 Day",
      icon: Clock,
      duration: "1",
      unit: "day",
    },
    {
      id: 3,
      type: "email",
      name: "Send Welcome Email",
      icon: Send,
      template: "welcome-email",
    },
    {
      id: 4,
      type: "condition",
      name: "Opened Email?",
      icon: Filter,
      condition: "opened",
    },
    {
      id: 5,
      type: "email",
      name: "Send Follow-up",
      icon: Send,
      template: "follow-up-email",
    },
  ]);

  const [selectedStep, setSelectedStep] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newStepPosition, setNewStepPosition] = useState(null);

  const handleSelectStep = (step) => {
    setSelectedStep(step);
    setIsAdding(false);
  };

  const handleAddStep = (position) => {
    setIsAdding(true);
    setNewStepPosition(position);
    setSelectedStep(null);
  };

  const handleAddStepType = (type) => {
    const newStep = createStepByType(type);
    const newId = Math.max(...steps.map((s) => s.id)) + 1;
    newStep.id = newId;

    const newSteps = [...steps];
    newSteps.splice(newStepPosition, 0, newStep);
    setSteps(newSteps);
    setIsAdding(false);
    setSelectedStep(newStep);
  };

  const handleUpdateStep = (updatedStep) => {
    const newSteps = steps.map((step) =>
      step.id === updatedStep.id ? updatedStep : step
    );
    setSteps(newSteps);
  };

  const handleDeleteStep = (stepId) => {
    setSteps(steps.filter((step) => step.id !== stepId));
    setSelectedStep(null);
  };

  const createStepByType = (type) => {
    switch (type) {
      case "trigger":
        return { type, name: "New Trigger", icon: MailPlus };
      case "delay":
        return { type, name: "Wait", icon: Clock, duration: "1", unit: "day" };
      case "email":
        return { type, name: "Send Email", icon: Send, template: "default" };
      case "condition":
        return { type, name: "Condition", icon: Filter, condition: "opened" };
      case "sms":
        return {
          type,
          name: "Send SMS",
          icon: MessageSquare,
          template: "default",
        };
      case "segment":
        return {
          type,
          name: "Add to Segment",
          icon: Users,
          segment: "default",
        };
      case "tag":
        return { type, name: "Add Tag", icon: Tag, tag: "new-tag" };
      default:
        return { type, name: "New Step", icon: Settings };
    }
  };

  const stepTypes = [
    { type: "trigger", name: "Trigger", icon: MailPlus },
    { type: "delay", name: "Delay", icon: Clock },
    { type: "email", name: "Email", icon: Send },
    { type: "condition", name: "Condition", icon: Filter },
    { type: "sms", name: "SMS", icon: MessageSquare },
    { type: "segment", name: "Segment", icon: Users },
    { type: "tag", name: "Tag", icon: Tag },
  ];

  return (
    <div className={className}>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Automation Flow Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex">
            {/* Steps panel */}
            <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 pr-4">
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    {/* Add button between steps */}
                    {index === 0 && (
                      <div className="flex justify-center mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full w-8 h-8 p-0"
                          onClick={() => handleAddStep(0)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    )}

                    {/* Step */}
                    <div
                      className={cn(
                        "flex items-center p-3 rounded-lg cursor-pointer transition-all",
                        selectedStep?.id === step.id
                          ? "bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                          : "bg-white hover:bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                      )}
                      onClick={() => handleSelectStep(step)}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                          step.type === "trigger"
                            ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                            : step.type === "delay"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : step.type === "email"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : step.type === "condition"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : step.type === "sms"
                            ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                        )}
                      >
                        <step.icon size={16} />
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {step.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {getStepDescription(step)}
                        </div>
                      </div>
                      {/* Delete button only shows for non-start steps when selected */}
                      {selectedStep?.id === step.id && index !== 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStep(step.id);
                          }}
                        >
                          <X size={16} />
                        </Button>
                      )}
                    </div>

                    {/* Connect line and add button */}
                    {index < steps.length - 1 && (
                      <div className="flex flex-col items-center py-1">
                        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full w-8 h-8 p-0 my-1"
                          onClick={() => handleAddStep(index + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                      </div>
                    )}

                    {/* Add button at the end */}
                    {index === steps.length - 1 && (
                      <div className="flex justify-center mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full w-8 h-8 p-0"
                          onClick={() => handleAddStep(steps.length)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Settings panel */}
            <div className="w-1/2 pl-4">
              {isAdding ? (
                <AddStepPanel
                  stepTypes={stepTypes}
                  onSelect={handleAddStepType}
                  onCancel={() => setIsAdding(false)}
                />
              ) : selectedStep ? (
                <StepConfigPanel
                  step={selectedStep}
                  onUpdate={handleUpdateStep}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="text-gray-400 dark:text-gray-500 mb-2">
                    <Settings size={48} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Automation Settings
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a step from the workflow to edit its settings or add
                    a new step to build your automation flow.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
          <Button variant="outline">Hủy</Button>
          <Button>Lưu Automation Flow</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Helper components
const AddStepPanel = ({ stepTypes, onSelect, onCancel }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Thêm bước mới
        </h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stepTypes.map((type) => (
          <div
            key={type.type}
            className="flex items-center p-3 rounded-lg cursor-pointer border border-gray-200 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-blue-900/20"
            onClick={() => onSelect(type.type)}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                type.type === "trigger"
                  ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  : type.type === "delay"
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : type.type === "email"
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : type.type === "condition"
                  ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : type.type === "sms"
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              )}
            >
              <type.icon size={16} />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {type.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StepConfigPanel = ({ step, onUpdate }) => {
  const [stepData, setStepData] = useState({ ...step });

  const handleChange = (field, value) => {
    const updated = { ...stepData, [field]: value };
    setStepData(updated);
    onUpdate(updated);
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {getStepTypeLabel(step.type)} Settings
      </h3>

      <div className="space-y-4">
        <FormItem>
          <FormLabel>Step Name</FormLabel>
          <Input
            value={stepData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </FormItem>

        {step.type === "delay" && (
          <div className="flex space-x-3">
            <FormItem className="flex-grow">
              <FormLabel>Duration</FormLabel>
              <Input
                type="number"
                min="1"
                value={stepData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
              />
            </FormItem>
            <FormItem className="flex-grow">
              <FormLabel>Unit</FormLabel>
              <select
                className="flex w-full h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                value={stepData.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
              >
                <option value="minute">Minutes</option>
                <option value="hour">Hours</option>
                <option value="day">Days</option>
                <option value="week">Weeks</option>
              </select>
            </FormItem>
          </div>
        )}

        {step.type === "email" && (
          <>
            <FormItem>
              <FormLabel>Email Template</FormLabel>
              <select
                className="flex w-full h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                value={stepData.template}
                onChange={(e) => handleChange("template", e.target.value)}
              >
                <option value="welcome-email">Welcome Email</option>
                <option value="follow-up-email">Follow-up Email</option>
                <option value="abandoned-cart">Abandoned Cart</option>
                <option value="promotional">Promotional</option>
                <option value="newsletter">Newsletter</option>
              </select>
            </FormItem>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Preview
                </span>
                <Button variant="ghost" size="sm">
                  Edit Template
                </Button>
              </div>
              <div className="p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {getEmailPreview(stepData.template)}
                </div>
              </div>
            </div>
          </>
        )}

        {step.type === "condition" && (
          <FormItem>
            <FormLabel>Condition Type</FormLabel>
            <select
              className="flex w-full h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              value={stepData.condition}
              onChange={(e) => handleChange("condition", e.target.value)}
            >
              <option value="opened">Email Opened</option>
              <option value="clicked">Link Clicked</option>
              <option value="notOpened">Email Not Opened</option>
              <option value="purchased">Made Purchase</option>
              <option value="custom">Custom Condition</option>
            </select>
          </FormItem>
        )}

        {step.type === "sms" && (
          <FormItem>
            <FormLabel>SMS Template</FormLabel>
            <select
              className="flex w-full h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              value={stepData.template}
              onChange={(e) => handleChange("template", e.target.value)}
            >
              <option value="default">Default</option>
              <option value="reminder">Reminder</option>
              <option value="confirmation">Confirmation</option>
              <option value="promotion">Promotion</option>
            </select>
          </FormItem>
        )}

        {step.type === "segment" && (
          <FormItem>
            <FormLabel>Segment</FormLabel>
            <select
              className="flex w-full h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              value={stepData.segment}
              onChange={(e) => handleChange("segment", e.target.value)}
            >
              <option value="default">Default</option>
              <option value="active-users">Active Users</option>
              <option value="new-customers">New Customers</option>
              <option value="vip">VIP</option>
            </select>
          </FormItem>
        )}

        {step.type === "tag" && (
          <FormItem>
            <FormLabel>Tag Name</FormLabel>
            <Input
              value={stepData.tag}
              onChange={(e) => handleChange("tag", e.target.value)}
            />
          </FormItem>
        )}
      </div>
    </div>
  );
};

// Helper functions
const getStepDescription = (step) => {
  switch (step.type) {
    case "trigger":
      return "Khởi động automation";
    case "delay":
      return `Đợi ${step.duration} ${getUnitLabel(step.unit)}`;
    case "email":
      return `Template: ${getTemplateName(step.template)}`;
    case "condition":
      return `Điều kiện: ${getConditionLabel(step.condition)}`;
    case "sms":
      return `SMS template: ${step.template}`;
    case "segment":
      return `Segment: ${step.segment}`;
    case "tag":
      return `Tag: ${step.tag}`;
    default:
      return step.type;
  }
};

const getStepTypeLabel = (type) => {
  switch (type) {
    case "trigger":
      return "Trigger";
    case "delay":
      return "Delay";
    case "email":
      return "Email";
    case "condition":
      return "Condition";
    case "sms":
      return "SMS";
    case "segment":
      return "Segment";
    case "tag":
      return "Tag";
    default:
      return type;
  }
};

const getUnitLabel = (unit) => {
  switch (unit) {
    case "minute":
      return "phút";
    case "hour":
      return "giờ";
    case "day":
      return "ngày";
    case "week":
      return "tuần";
    default:
      return unit;
  }
};

const getTemplateName = (template) => {
  switch (template) {
    case "welcome-email":
      return "Welcome Email";
    case "follow-up-email":
      return "Follow-up Email";
    case "abandoned-cart":
      return "Abandoned Cart";
    case "promotional":
      return "Promotional";
    case "newsletter":
      return "Newsletter";
    default:
      return template;
  }
};

const getConditionLabel = (condition) => {
  switch (condition) {
    case "opened":
      return "Email đã mở";
    case "clicked":
      return "Link đã click";
    case "notOpened":
      return "Email chưa mở";
    case "purchased":
      return "Đã mua hàng";
    case "custom":
      return "Tùy chỉnh";
    default:
      return condition;
  }
};

const getEmailPreview = (template) => {
  switch (template) {
    case "welcome-email":
      return "Subject: Chào mừng bạn đến với MAMLM!\n\nChào [Tên khách hàng],\n\nCảm ơn bạn đã tham gia cùng chúng tôi. Khám phá ngay các tính năng...";
    case "follow-up-email":
      return "Subject: Bạn đã thử các tính năng chưa?\n\nChào [Tên khách hàng],\n\nChúng tôi thấy bạn đã tham gia được một thời gian. Bạn đã khám phá...";
    case "abandoned-cart":
      return "Subject: Giỏ hàng của bạn đang chờ thanh toán\n\nChào [Tên khách hàng],\n\nBạn đã quên thanh toán giỏ hàng của mình? Hoàn tất đơn hàng ngay...";
    case "promotional":
      return "Subject: Ưu đãi đặc biệt dành riêng cho bạn!\n\nChào [Tên khách hàng],\n\nChúng tôi có một ưu đãi đặc biệt dành riêng cho bạn...";
    case "newsletter":
      return "Subject: Bản tin tháng 4/2025\n\nChào [Tên khách hàng],\n\nCập nhật mới nhất về ngành Marketing Automation...";
    default:
      return "Email preview not available";
  }
};

export default AutomationFlowBuilder;

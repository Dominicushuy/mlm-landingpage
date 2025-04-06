import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  AlertCircle,
  Check,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Save,
  PlayCircle,
  PauseCircle,
  Info,
  Mail,
} from "lucide-react";

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
  const [showTips, setShowTips] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedStep, setDraggedStep] = useState(null);
  const [savedStatus, setSavedStatus] = useState(null);

  useEffect(() => {
    // Simulate auto-save functionality
    const saveTimer = setTimeout(() => {
      if (savedStatus === "saving") {
        setSavedStatus("saved");

        // Reset saved status after showing success message
        setTimeout(() => {
          setSavedStatus(null);
        }, 2000);
      }
    }, 1500);

    return () => clearTimeout(saveTimer);
  }, [savedStatus]);

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

    // Trigger saving animation
    setSavedStatus("saving");
  };

  const handleUpdateStep = (updatedStep) => {
    const newSteps = steps.map((step) =>
      step.id === updatedStep.id ? updatedStep : step
    );
    setSteps(newSteps);

    // Trigger saving animation
    setSavedStatus("saving");
  };

  const handleDeleteStep = (stepId) => {
    setSteps(steps.filter((step) => step.id !== stepId));
    setSelectedStep(null);

    // Trigger saving animation
    setSavedStatus("saving");
  };

  const handleDragStart = (step) => {
    setIsDragging(true);
    setDraggedStep(step);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedStep(null);
  };

  const handleDrop = (targetIndex) => {
    if (!draggedStep) return;

    const sourceIndex = steps.findIndex((s) => s.id === draggedStep.id);
    if (sourceIndex === targetIndex) return;

    const newSteps = [...steps];
    newSteps.splice(sourceIndex, 1);
    newSteps.splice(targetIndex, 0, draggedStep);

    setSteps(newSteps);
    setIsDragging(false);
    setDraggedStep(null);

    // Trigger saving animation
    setSavedStatus("saving");
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      <Card className="shadow-xl border border-indigo-200/50 dark:border-indigo-800/30 overflow-hidden bg-gradient-to-br from-white/95 to-indigo-50/50 dark:from-gray-800/95 dark:to-indigo-900/10 backdrop-blur-sm">
        <CardHeader className="border-b border-indigo-100 dark:border-indigo-800/40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <Zap className="h-5 w-5" />
              </div>
              <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Automation Flow Builder
              </CardTitle>
            </div>
            {savedStatus && (
              <div
                className={`flex items-center gap-2 text-sm font-medium ${
                  savedStatus === "saving"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {savedStatus === "saving" ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    <span>Đang lưu...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Đã lưu!</span>
                  </>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Steps panel with enhanced design */}
            <div className="w-full lg:w-1/2 border-r border-indigo-100 dark:border-indigo-800/40 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <span>Workflow Steps</span>
                  <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full text-xs">
                    {steps.length} steps
                  </span>
                </h3>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs flex items-center gap-1"
                    onClick={() => setShowTips(!showTips)}
                  >
                    <Info className="h-3.5 w-3.5" />
                    {showTips ? "Hide" : "Show"} Tips
                    {showTips ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Tips box */}
              <AnimatePresence>
                {showTips && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-3 mb-4 text-sm text-blue-700 dark:text-blue-300">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1">
                            Tips for building your flow:
                          </p>
                          <ul className="list-disc list-inside text-xs space-y-1 text-blue-600 dark:text-blue-300">
                            <li>Drag and drop steps to reorder them</li>
                            <li>Click + buttons to add new steps</li>
                            <li>Click on a step to edit its settings</li>
                            <li>Start with a trigger followed by actions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2 mt-4">
                <AnimatePresence>
                  {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      {/* Add button between steps */}
                      {index === 0 && (
                        <motion.div
                          variants={itemVariants}
                          className="flex justify-center mb-2"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full w-8 h-8 p-0 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 shadow-sm"
                            onClick={() => handleAddStep(0)}
                          >
                            <Plus size={16} />
                          </Button>
                        </motion.div>
                      )}

                      {/* Enhanced Step Card */}
                      <motion.div
                        variants={itemVariants}
                        whileHover={{ x: selectedStep?.id === step.id ? 0 : 5 }}
                        className={`relative`}
                        draggable
                        onDragStart={() => handleDragStart(step)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(index)}
                      >
                        <div
                          className={cn(
                            "flex items-center p-4 rounded-lg cursor-pointer transition-all",
                            selectedStep?.id === step.id
                              ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 shadow-md"
                              : "bg-white hover:bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 shadow-sm",
                            isDragging && draggedStep?.id === step.id
                              ? "opacity-60 border-dashed"
                              : "opacity-100"
                          )}
                          onClick={() => handleSelectStep(step)}
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm",
                              getStepColorClasses(step.type).bg,
                              getStepColorClasses(step.type).text
                            )}
                          >
                            <step.icon size={20} />
                          </div>
                          <div className="flex-grow">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {step.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  getStepColorClasses(step.type).dotColor
                                }`}
                              ></span>
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

                          {/* Draggable indicator */}
                          <div className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 cursor-move">
                            <svg
                              width="10"
                              height="16"
                              viewBox="0 0 10 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4ZM8 6C6.9 6 6 6.9 6 8C6 9.1 6.9 10 8 10C9.1 10 10 9.1 10 8C10 6.9 9.1 6 8 6ZM8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                      </motion.div>

                      {/* Connect line and add button */}
                      {index < steps.length - 1 && (
                        <div className="flex flex-col items-center py-1 relative">
                          <div className="h-8 w-0.5 bg-indigo-200 dark:bg-indigo-700 my-1"></div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full w-8 h-8 p-0 absolute top-1/2 transform -translate-y-1/2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 shadow-sm"
                            onClick={() => handleAddStep(index + 1)}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      )}

                      {/* Add button at the end */}
                      {index === steps.length - 1 && (
                        <motion.div
                          variants={itemVariants}
                          className="flex justify-center mt-2"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full w-8 h-8 p-0 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 shadow-sm"
                            onClick={() => handleAddStep(steps.length)}
                          >
                            <Plus size={16} />
                          </Button>
                        </motion.div>
                      )}
                    </React.Fragment>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Settings panel with enhanced design */}
            <div className="w-full lg:w-1/2 p-5">
              {isAdding ? (
                <AddStepPanelEnhanced
                  stepTypes={stepTypes}
                  onSelect={handleAddStepType}
                  onCancel={() => setIsAdding(false)}
                />
              ) : selectedStep ? (
                <StepConfigPanelEnhanced
                  step={selectedStep}
                  onUpdate={handleUpdateStep}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Settings
                      size={32}
                      className="text-indigo-500 dark:text-indigo-400"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Automation Settings
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    Select a step from the workflow to edit its settings or add
                    a new step to build your automation flow.
                  </p>

                  <div className="mt-6 flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                    >
                      <PlayCircle className="h-4 w-4" />
                      Test Flow
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <PauseCircle className="h-4 w-4" />
                      Pause Flow
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-indigo-100 dark:border-indigo-800/40 pt-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5">
          <Button
            variant="outline"
            className="border-gray-200 dark:border-gray-700"
          >
            Hủy
          </Button>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none">
            <Save className="h-4 w-4 mr-2" />
            Lưu Automation Flow
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Enhanced Helper components
const AddStepPanelEnhanced = ({ stepTypes, onSelect, onCancel }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-indigo-100 dark:border-indigo-800/30 p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 flex items-center gap-2">
          <Plus className="h-5 w-5 text-indigo-500" />
          Thêm bước mới
        </h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        {stepTypes.map((type) => (
          <motion.div
            key={type.type}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border hover:shadow-md transition-all
              ${getStepTypeCardStyles(type.type).border}
              ${getStepTypeCardStyles(type.type).bg}
            `}
            onClick={() => onSelect(type.type)}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-sm
                ${getStepTypeCardStyles(type.type).iconBg}
                ${getStepTypeCardStyles(type.type).iconText}
              `}
            >
              <type.icon size={20} />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white text-center">
              {type.name}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700 mt-6 pt-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
          <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p>
            Các bước được thực hiện theo thứ tự từ trên xuống dưới. Thêm điều
            kiện để tạo các nhánh cho các trường hợp khác nhau.
          </p>
        </div>
      </div>
    </div>
  );
};

const StepConfigPanelEnhanced = ({ step, onUpdate }) => {
  const [stepData, setStepData] = useState({ ...step });

  const handleChange = (field, value) => {
    const updated = { ...stepData, [field]: value };
    setStepData(updated);
    onUpdate(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-indigo-100 dark:border-indigo-800/30 p-5 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
            getStepColorClasses(step.type).bg,
            getStepColorClasses(step.type).text
          )}
        >
          <step.icon size={20} />
        </div>
        <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          {getStepTypeLabel(step.type)} Settings
        </h3>
      </div>

      <div className="space-y-5">
        <FormItem>
          <FormLabel>Step Name</FormLabel>
          <Input
            value={stepData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border-indigo-100 dark:border-indigo-800/50 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </FormItem>

        {step.type === "delay" && (
          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <Input
                type="number"
                min="1"
                value={stepData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                className="border-indigo-100 dark:border-indigo-800/50 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </FormItem>
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <select
                className="flex w-full h-10 px-3 py-2 rounded-md border border-indigo-100 dark:border-indigo-800/50 bg-white text-sm text-gray-900 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
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
                className="flex w-full h-10 px-3 py-2 rounded-md border border-indigo-100 dark:border-indigo-800/50 bg-white text-sm text-gray-900 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
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
            <div className="p-4 bg-indigo-50/70 dark:bg-indigo-900/10 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-500" />
                  Email Preview
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-xs"
                >
                  Edit Template
                </Button>
              </div>
              <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
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
              className="flex w-full h-10 px-3 py-2 rounded-md border border-indigo-100 dark:border-indigo-800/50 bg-white text-sm text-gray-900 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
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
              className="flex w-full h-10 px-3 py-2 rounded-md border border-indigo-100 dark:border-indigo-800/50 bg-white text-sm text-gray-900 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
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
              className="flex w-full h-10 px-3 py-2 rounded-md border border-indigo-100 dark:border-indigo-800/50 bg-white text-sm text-gray-900 dark:bg-gray-800 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
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
              className="border-indigo-100 dark:border-indigo-800/50 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </FormItem>
        )}

        {/* Action buttons */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            className="text-xs px-3 border-gray-200 dark:border-gray-700"
          >
            Reset
          </Button>
          <Button
            size="sm"
            className="text-xs px-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none text-white"
          >
            <Check className="h-3.5 w-3.5 mr-1" />
            Apply Changes
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Helper functions with enhanced styling support
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

// Color utilities for different step types
const getStepColorClasses = (type) => {
  switch (type) {
    case "trigger":
      return {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400",
        dotColor: "bg-purple-500",
      };
    case "delay":
      return {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        dotColor: "bg-blue-500",
      };
    case "email":
      return {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
        dotColor: "bg-green-500",
      };
    case "condition":
      return {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-600 dark:text-yellow-400",
        dotColor: "bg-yellow-500",
      };
    case "sms":
      return {
        bg: "bg-indigo-100 dark:bg-indigo-900/30",
        text: "text-indigo-600 dark:text-indigo-400",
        dotColor: "bg-indigo-500",
      };
    case "segment":
      return {
        bg: "bg-pink-100 dark:bg-pink-900/30",
        text: "text-pink-600 dark:text-pink-400",
        dotColor: "bg-pink-500",
      };
    case "tag":
      return {
        bg: "bg-cyan-100 dark:bg-cyan-900/30",
        text: "text-cyan-600 dark:text-cyan-400",
        dotColor: "bg-cyan-500",
      };
    default:
      return {
        bg: "bg-gray-100 dark:bg-gray-700",
        text: "text-gray-600 dark:text-gray-400",
        dotColor: "bg-gray-500",
      };
  }
};

// Step type card styles
const getStepTypeCardStyles = (type) => {
  switch (type) {
    case "trigger":
      return {
        border: "border-purple-200 dark:border-purple-800/30",
        bg: "bg-purple-50/50 dark:bg-purple-900/10 hover:bg-purple-100/70 dark:hover:bg-purple-900/20",
        iconBg: "bg-purple-500",
        iconText: "text-white",
      };
    case "delay":
      return {
        border: "border-blue-200 dark:border-blue-800/30",
        bg: "bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-100/70 dark:hover:bg-blue-900/20",
        iconBg: "bg-blue-500",
        iconText: "text-white",
      };
    case "email":
      return {
        border: "border-green-200 dark:border-green-800/30",
        bg: "bg-green-50/50 dark:bg-green-900/10 hover:bg-green-100/70 dark:hover:bg-green-900/20",
        iconBg: "bg-green-500",
        iconText: "text-white",
      };
    case "condition":
      return {
        border: "border-yellow-200 dark:border-yellow-800/30",
        bg: "bg-yellow-50/50 dark:bg-yellow-900/10 hover:bg-yellow-100/70 dark:hover:bg-yellow-900/20",
        iconBg: "bg-yellow-500",
        iconText: "text-white",
      };
    case "sms":
      return {
        border: "border-indigo-200 dark:border-indigo-800/30",
        bg: "bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/20",
        iconBg: "bg-indigo-500",
        iconText: "text-white",
      };
    case "segment":
      return {
        border: "border-pink-200 dark:border-pink-800/30",
        bg: "bg-pink-50/50 dark:bg-pink-900/10 hover:bg-pink-100/70 dark:hover:bg-pink-900/20",
        iconBg: "bg-pink-500",
        iconText: "text-white",
      };
    case "tag":
      return {
        border: "border-cyan-200 dark:border-cyan-800/30",
        bg: "bg-cyan-50/50 dark:bg-cyan-900/10 hover:bg-cyan-100/70 dark:hover:bg-cyan-900/20",
        iconBg: "bg-cyan-500",
        iconText: "text-white",
      };
    default:
      return {
        border: "border-gray-200 dark:border-gray-700",
        bg: "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700",
        iconBg: "bg-gray-500",
        iconText: "text-white",
      };
  }
};

export default AutomationFlowBuilder;

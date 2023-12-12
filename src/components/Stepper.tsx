import { memo } from "react";
import {
  Box,
  Progress,
  Step,
  StepIcon,
  StepIndicator,
  StepStatus,
  Stepper as StepperBox,
} from "@chakra-ui/react";

type StepperType = {
  index: number;
  complete: number;
};

const steps = [{ title: "Form" }, { title: "Role" }];
const max = steps.length - 1;

const Stepper = ({ complete, index }: StepperType) => {
  const progressPercent = (complete / max) * 100;

  return (
    <Box position="relative" width={300} zIndex={30} marginBottom={30}>
      <StepperBox size="sm" index={index} gap="0">
        {steps.map((step, index) => (
          <Step key={index} gap="0">
            <StepIndicator bg="white">
              <StepStatus complete={<StepIcon />} />
            </StepIndicator>
          </Step>
        ))}
      </StepperBox>
      <Progress
        value={progressPercent}
        position="absolute"
        height="3px"
        width="full"
        top="10px"
        zIndex={-1}
      />
    </Box>
  );
};

export default memo(Stepper);

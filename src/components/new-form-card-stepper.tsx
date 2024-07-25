import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import { styled } from "@mui/material/styles";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Iconify from "./iconify";

interface NewFormCardProps {
  children: ReactNode;
  steps: string[];
  disable?: any;
  loading?: any;
  activeStep: number;
  listPath: string;
  setActiveStep: (newStep: number) => void;
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderRadius: 1,
    borderTopWidth: 3,
    borderColor: theme.palette.divider,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    height: 22,
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.disabled,
    ...(ownerState.active && {
      color: theme.palette.primary.main,
    }),
    "& .QontoStepIcon-completedIcon": {
      zIndex: 1,
      fontSize: 18,
      color: theme.palette.primary.main,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);
//-----------------------------------------------------------------------------------

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Iconify
          icon="eva:checkmark-fill"
          className="QontoStepIcon-completedIcon"
          width={24}
          height={24}
        />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

//-----------------------------------------------------------------------------------

export default function NewFormCardStepper(props: NewFormCardProps) {
  const {
    children,
    steps,
    disable,
    loading,
    activeStep,
    setActiveStep,
    listPath,
  } = props;
  // const [activeStep, setActiveStep] = useState(0);

  const router = useRouter();

  const handleCancelButton = () => {
    router.push(listPath);
  };
  const handleBackButton = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <Card>
      <Stack
        sx={{
          width: "100%",
          height: 95,
          bgcolor: (theme) => theme.palette.background.neutral,
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
          sx={{ width: "100%" }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <Divider />
      <Box sx={{ p: 2 }}>{children}</Box>
      <Divider />
      <Stack
        sx={{
          height: 72,
          p: 2,
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        {activeStep === 0 ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCancelButton}
          >
            بازگشت به لیست مواد غذایی
          </Button>
        ) : (
          <Button variant="outlined" color="primary" onClick={handleBackButton}>
            مرحله قبل
          </Button>
        )}
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={disable}
          loading={loading}
          type="submit"
        >
          ثبت {steps[activeStep]}
        </LoadingButton>
      </Stack>
    </Card>
  );
}

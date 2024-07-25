import TUSFileUpload from 'src/components/tusFileUpload';

export default function HomePage() {
  return <TUSFileUpload endpoint="http://localhost:7781/tusd-private-files/" />;
}

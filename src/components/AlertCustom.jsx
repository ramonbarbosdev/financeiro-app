import Alert from 'react-bootstrap/Alert';

function AlertCustom({tipo, titulo, msg}) {
  return (
    <Alert variant={`${tipo}`} >
      {/* <Alert.Heading>{titulo}</Alert.Heading> */}
      <p>{msg}</p>
    </Alert>
  );
}

export default AlertCustom;
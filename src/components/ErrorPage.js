import React from 'react';

function ErrorPage(props) {
  const { weather } = props;
  const { cod, message } = weather;

  return (
    <div id="errorPage" className="cold1">
      <p>
        {cod}, {message}
      </p>
    </div>
  );
}

export default ErrorPage;

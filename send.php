<?php
if ((isset($_POST['tel']) && $_POST['tel'] != "")) { //Проверка отправилось ли наше поля name и не пустые ли они
    $to = 'busforward@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
    if ((isset($_POST['email']) && $_POST['email'] != "")) {
    	$subject = 'Отправить каталог'; //Заголовок сообщения

	    $message = '
	                <html>
	                    <head>
	                        <title>' . $subject . '</title>
	                    </head>
	                    <body>
	                        <p>Почта: ' . $_POST['email'] . '</p>
	                        <p>Телефон: ' . $_POST['tel'] . '</p>                        
	                    </body>
	                </html>'; 
    } else {
    	$subject = 'Обратный звонок'; //Заголовок сообщения

	    $message = '
		                <html>
		                    <head>
		                        <title>' . $subject . '</title>
		                    </head>
		                    <body>
		                        <p>Телефон: ' . $_POST['tel'] . '</p>                        
		                    </body>
		                </html>'; 
    }
    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Отправитель <busforward@gmail.com>\r\n"; //Наименование и почта отправителя
    if (mail($to, $subject, $message, $headers)) {
        echo 'success';
    } else {
        echo 'error';
    }
}?>
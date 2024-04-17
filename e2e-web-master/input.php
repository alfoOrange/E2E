<?php

error_reporting(0);

$name    = $_GET['name'];
$email   = $_GET['email'];
$message = $_GET['message'];

if( filter_var( $email, FILTER_VALIDATE_EMAIL ) )
{
    //Valid email.
    if( !empty($name) && !empty($message) )
    {
        sm( $email, $name, $message );
        return;
    }

    //Just save it.
    error_log( $email."\n", 3, '/home/httpd/www.end2end.com.ar/logs/subscribe.log' );
}


function sm( $email, $name, $message )
{
    error_log( "Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n---------------------------\n\n", 3, '/home/httpd/www.end2end.com.ar/logs/messages.log' );

}


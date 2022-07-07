<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'comments_data' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost/' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '+~U-Uz$Z!f/Xz5]$Qq6,DDKx#Dw+dv+IW>a5H<0hB!N_35I$}sqK33fV[@wcB dc' );
define( 'SECURE_AUTH_KEY',  'Cp]s@EX#?;WpkHh<Xa-~[+cvLtHKO`hjl$ z%]x-A$X^nQ :pd#S}OsyvZEhv*~2' );
define( 'LOGGED_IN_KEY',    '!]z#>fhyqjC#YyoYv0XHpCOL[O r}RgTZt9Y]wCK77pUjd%zHd+/x`wYxrnGglp^' );
define( 'NONCE_KEY',        '/L3`IJ5YK(7`Y<OXX87T#]v~Fkh!V~PrX%!t@u-f$^pFQ3)+8bORt+mVqgCoq5QW' );
define( 'AUTH_SALT',        'L:[Not#mAFGadS|+G4vTEg[d09^FO!~pX:J/~%fR7$r)-z/3)?xIVvmRPK#y~ZBZ' );
define( 'SECURE_AUTH_SALT', 'sXZUm`:FBZez5ycoK8VD:H{ oCe+CA}18Kwt>04[q(c{H7EW69zFZNYkCE;{2[|D' );
define( 'LOGGED_IN_SALT',   'Km0ygimJza2ZAU:ko%?{),3Yx0thuC JR2@~-_ )MnU92V&[{pjH)nNDsT*!lM(~' );
define( 'NONCE_SALT',       'ZmG8y7fELuZ48D&&?R&){4X@A,Y[Lc&dsreB@oW[JI[pNJVcUypQoo7DH)#78B>B' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

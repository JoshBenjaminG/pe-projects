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
define( 'DB_NAME', 'monster_data' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

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
define( 'AUTH_KEY',         'oJu*y^&LeuCW}@x;DfZu5i AWz(]*]j4Gn=(/)}|*oWsK{F(srsT#cH/83lTjXOT' );
define( 'SECURE_AUTH_KEY',  '9zI<Q3`tgxF$R75(ni!l.rea!V7_k  E>a@Tjv6z+b#GvpR}_X3skIFV:>w(-@Q5' );
define( 'LOGGED_IN_KEY',    'xS~j.V[ejF&%0neSX+2cGH1xX$/]p6=y4-0;qtJ.&HQ|E8[3Q0&~fI-hila n2X$' );
define( 'NONCE_KEY',        '2jCBW`vjApqiQ]jymuaXT]=fj>LBASL<V;7Hj<:qSa{==[Zt9*s3/Pl.&qU~hJ(V' );
define( 'AUTH_SALT',        '@$qe}W]S6*SMB%dUC}c&@y9nT0a[?!DgQEhGX#kXdq{FQ tgZl]l{mKsH8s[HNO2' );
define( 'SECURE_AUTH_SALT', 'i(3W=LFb>Y]FYBRj@/zLMuG1!xTb1e*g=wSJc=*bA<kKuhpWqoW!/MH$i7xqB2ZS' );
define( 'LOGGED_IN_SALT',   ':,`hjn,|({0$)p@*Q9}J!ktrilPhia6 31K;3mlsJ_PI^B|d+Kn})%-m&}%ZSZNb' );
define( 'NONCE_SALT',       '@m^ N|CD%hatpW<8G_Gf#TuY|gA)5d~>h{Y;&-~7K_W:SDKbfC:!=h+K#sc r]=4' );

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

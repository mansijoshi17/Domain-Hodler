import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" type="text/css" href="css/app.min.css" />
                    <link rel="stylesheet" type="text/css" href="css/custom.css" />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        charset="UTF-8"
                        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                    />

                    <link rel="stylesheet" type="text/css" href="css/app.min.css" />
                    <link rel="stylesheet" type="text/css" href="css/custom.css" />

                    <link id="bootstrap" href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
                    <link id="bootstrap-grid" href="css/bootstrap-grid.min.css" rel="stylesheet" type="text/css" />
                    <link id="bootstrap-reboot" href="css/bootstrap-reboot.min.css" rel="stylesheet" type="text/css" />
                    <link href="css/animate.css" rel="stylesheet" type="text/css" />
                    <link href="css/owl.carousel.css" rel="stylesheet" type="text/css" />
                    <link href="css/owl.theme.css" rel="stylesheet" type="text/css" />
                    <link href="css/owl.transitions.css" rel="stylesheet" type="text/css" />
                    <link href="css/magnific-popup.css" rel="stylesheet" type="text/css" />
                    <link href="css/jquery.countdown.css" rel="stylesheet" type="text/css" />
                    <link href="css/style.css" rel="stylesheet" type="text/css" />

                    <link id="colors" href="css/colors/scheme-01.css" rel="stylesheet" type="text/css" />
                    <link href="css/coloring.css" rel="stylesheet" type="text/css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="js/jquery.min.js"></script>
                    <script src="js/bootstrap.min.js"></script>
                    <script src="js/bootstrap.bundle.min.js"></script>
                    <script src="js/wow.min.js"></script>
                    <script src="js/jquery.isotope.min.js"></script>
                    <script src="js/easing.js"></script>
                    <script src="js/owl.carousel.js"></script>
                    <script src="js/validation.js"></script>
                    <script src="js/jquery.magnific-popup.min.js"></script>
                    <script src="js/enquire.min.js"></script>
                    <script src="js/jquery.plugin.js"></script>
                    <script src="js/jquery.countTo.js"></script>
                    <script src="js/jquery.countdown.js"></script>
                    <script src="js/jquery.lazy.min.js"></script>
                    <script src="js/jquery.lazy.plugins.min.js"></script>
                    <script src="js/designesia.js"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument
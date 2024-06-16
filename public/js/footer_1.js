const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-content">
        <img src="../img/light-logo.png" class="logo" alt="">
        <div class="footer-ul-container">
<!--            <ul class="category">-->
<!--                <li class="category-title">men</li>-->
<!--                <li><a href="#" class="footer-link">t-shirt</a></li>-->
<!--                <li><a href="#" class="footer-link">sweatshirts</a></li>-->
<!--                <li><a href="#" class="footer-link">t-shirt</a></li>-->
<!--                <li><a href="#" class="footer-link">jeans</a></li>-->
<!--                <li><a href="#" class="footer-link">trousers</a></li>-->
<!--                <li><a href="#" class="footer-link">shoes</a></li>-->
<!--                <li><a href="#" class="footer-link">casuals</a></li>-->
<!--                <li><a href="#" class="footer-link">formals</a></li>-->
<!--                <li><a href="#" class="footer-link">sports</a></li>-->
<!--                <li><a href="#" class="footer-link">watch</a></li>-->
<!--            </ul>-->
<!--            <ul class="category">-->
<!--                <li class="category-title">women</li>-->
<!--                <li><a href="#" class="footer-link">t-shirt</a></li>-->
<!--                <li><a href="#" class="footer-link">sweatshirts</a></li>-->
<!--                <li><a href="#" class="footer-link">t-shirt</a></li>-->
<!--                <li><a href="#" class="footer-link">jeans</a></li>-->
<!--                <li><a href="#" class="footer-link">trousers</a></li>-->
<!--                <li><a href="#" class="footer-link">shoes</a></li>-->
<!--                <li><a href="#" class="footer-link">casuals</a></li>-->
<!--                <li><a href="#" class="footer-link">formals</a></li>-->
<!--                <li><a href="#" class="footer-link">sports</a></li>-->
<!--                <li><a href="#" class="footer-link">watch</a></li>-->
<!--            </ul>-->
            </div>
        </div>
        <p class="footer-title">about company</p>
        <p class="info">Discover the latest fashion trends for the whole family at our online clothing store. We offer a wide selection of stylish men's, women's, and kids' clothes, along with a variety of shoes and accessories to complete your look. With convenient online shopping and a range of sizes and styles, we make it easy to find the perfect outfit for any occasion.</p>
        <p class="info">support emails:  help@clothing.com, customersupport@clothing.com</p>
        <p class="info">phone: - +1 120 120 1202, +1 120 120 1203</p>
        <div class="footer-social-container">
            <div>
                <a href="#" class="social-link">terms & services</a>
                <a href="#" class="social-link">privacy page</a>
            </div>
            <div>
                <a href="#" class="social-link">instagram</a>
                <a href="#" class="social-link">facebook</a>
                <a href="#" class="social-link">twitter</a>
            </div>
        </div>
        <p class="footer-credit">Clothing, Best apparels online store</p>
    `;
}

// createFooter();
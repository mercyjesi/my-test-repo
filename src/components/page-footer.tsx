export const PageFooter = () => (
  <footer>
    <div className="footer-content">
      <div className="footer-left">
        <div className="footer-left__top">
          <span>
            <a href="https://www.aspiresys.com/" target="_self">
              Aspire Systems
            </a>
          </span>
        </div>
        <div className="footer-left__bottom">
          <img
            src={process.env.PUBLIC_URL + "images/Aspire_1.webp"}
            alt="Aspire (1).png"
          />
          <span>© 2024</span>
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-right__top">
          <div className="footer-right__top-left">
            <span>+ 65 31633050</span>
            <span>info@aspiresys.com</span>
          </div>
          <div className="footer-right__top-right">
            <span>51 CHANGI BUSINESS PARK </span>
            <span>CENTRAL 2, #03-09,</span>
            <span>SINGAPORE - 486066</span>
          </div>
        </div>
        <div className="footer-right__bottom">
          <span>Subscribe to Newsletter</span>
          <form>
            <label>Enter Your Email</label>
            <div className="text-box">
              <input
                name="email"
                type="email"
                placeholder=""
                pattern="^.+@.+\.[a-zA-Z]{2,63}$"
                maxLength={250}
                autoComplete="off"
              />
              <button>Subscribe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </footer>
);

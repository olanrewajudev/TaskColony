import AllAdmin from "./Pages/Admin/Admin.jsx/AllAdmin"
import CreateAdmin from "./Pages/Admin/Admin.jsx/CreateAdmin"
import AdminLogin from "./Pages/Admin/AdminForms/AdminLogin"
import AllCoupon from "./Pages/Admin/Coupon/AllCoupon"
import NewCoupon from "./Pages/Admin/Coupon/NewCoupon"
import Dashboard from "./Pages/Admin/Dashboard"
import AllServices from "./Pages/Admin/Services/AllServices"
import NewServices from "./Pages/Admin/Services/NewServices"
import AllTaxes from "./Pages/Admin/Taxes/AllTaxes"
import NewTax from "./Pages/Admin/Taxes/NewTaxes"
import NewSlider from './Pages/Admin/Sliders/NewSlider'
import AllSlider from "./Pages/Admin/Sliders/AllSlider"
import AllCategories from "./Pages/Admin/Categories/AllCategories"
import NewCategory from "./Pages/Admin/Categories/NewCategory"
import AllBookings from "./Pages/Admin/Bookings/AllBookings"
import AllUser from "./Pages/Admin/Users/AllUser"
import AllEarning from "./Pages/Admin/Earning/AllEarning"
import SingleUser from "./Pages/Admin/Users/SingleUser/SingleUser"
import FormTest from "./FormTest"
import Home from "./Pages/General/Home"
import User from "./Pages/User/Profiles/User"
import Terms from "./Pages/General/Terms"
import Privacy from "./Pages/General/Privacy"
import Aboutus from "./Pages/General/Aboutus"
import BookingList from "./Pages/User/Service/BookingList"
import Category from "./Pages/General/Category"
import Subcategory from "./Pages/General/Subcategory"
import Service from "./Pages/User/Service/Service"
import ServiceDetail from "./Pages/User/Service/ServiceDetail"
import Login from "./Pages/General/Forms/Login"
import Signup from "./Pages/General/Forms/Signup"
import ForgetPassword from "./Pages/General/Forms/ForgetPassword"
import Notification from "./Pages/General/Notification"
import ConfirmBooking from "./Pages/User/Service/ConfirmBooking"
import Contactus from "./Pages/General/Contactus"
import Faq from "./Pages/General/Faq"
import Provider from "./Pages/User/Provider/Provider"
import AutoLocationComponent from "./Components/General/Map"
import Booking from "./Pages/User/Service/NewBooking"
import KycForm from "./Pages/User/Provider/KycForm"
import BookingDetail from "./Pages/User/Service/BookingDetail"
import TranscationHistory from "./Pages/General/TranscationHistory"
import Marquee from "./Pages/Admin/Marquee"
import Teams from "./Pages/General/Team"
import FavService from "./Pages/User/Provider/FavService"
import UserFavService from "./Pages/User/Profiles/FavouriteService"
import AllTestemonials from "./Pages/Admin/Testemonial.jsx/AllTestemonials"
import ProviderSettings from "./Pages/User/Provider/ProviderSettings"
import AdminForgetPassword from "./Pages/Admin/AdminForms/AdminForgetPassword"
import AllProvider from "./Pages/Admin/Provider/AllProvider"
import SingleProvider from "./Pages/Admin/Provider/SingleProvider/SingleProvider"
import NewsLetter from "./Pages/Admin/NewsLetter"
import ProviderTerms from "./Pages/General/ProviderTerms"
import AllFaqs from "./Pages/Admin/Faqs/AllFaqs"
import NewFaqs from "./Pages/Admin/Faqs/NewFaqs"
import Marketing from "./Pages/Admin/Marketing"


export const GeneralNoAuth = [
    { path: 'login', element: Login },
    { path: 'login.html', element: Login },
    { path: 'reset-password', element: ForgetPassword },
    { path: 'signup', element: Signup },
    { path: 'forms', element: FormTest },
    { path: '', element: Home },
    { path: 'service', element: Service },
    { path: 'terms', element: Terms },
    { path: 'provider-terms', element: ProviderTerms },
    { path: 'privacy', element: Privacy },
    { path: 'about', element: Aboutus },
    { path: 'faq', element: Faq },
    { path: 'contact', element: Contactus },
    { path: 'verify', element: AutoLocationComponent },
    { path: 'service-detail/:userid', element: ServiceDetail },
    { path: 'category', element: Category },
    { path: 'sub-category/:trackid', element: Subcategory },
    { path: 'team', element: Teams },


]   
export const GeneralRoutes = [
    { path: 'user', element: User },
    { path: 'notification', element: Notification },
    { path: 'fund-history', element: TranscationHistory },
    { path: 'confirm-booking', element: ConfirmBooking },
    { path: 'booking-detail/:trackid', element: BookingDetail },
    { path: 'booking', element: BookingList },
    { path: 'new-booking', element: Booking },
    { path: 'provider', element: Provider },
    { path: 'provider-kyc', element: KycForm },
    { path: 'provider-settings', element: ProviderSettings },
    { path: 'booking-list', element: BookingList },
    { path: 'favourite', element: FavService },
    { path: 'user-favourite', element: UserFavService },


]

export const AdminRoutes = [
    { path: '', element: Dashboard },
    { path: 'admin', element: AllAdmin },
    { path: 'news-letter', element: NewsLetter },
    { path: 'new-admin', element: CreateAdmin },
    { path: 'service', element: AllServices },
    { path: 'new-service', element: NewServices },
    { path: 'Earning', element: AllEarning },
    { path: 'user', element: AllUser },
    { path: 'provider', element: AllProvider },
    { path: 'user/single/:userid', element: SingleUser },
    { path: 'provider/single/:userid', element: SingleProvider },
    { path: 'booking', element: AllBookings },
    { path: 'testemonial', element: AllTestemonials },
    { path: 'category', element: AllCategories },
    { path: 'new-category', element: NewCategory },
    { path: 'slider', element: AllSlider },
    { path: 'faqs', element: AllFaqs },
    { path: 'new-slider', element: NewSlider },
    { path: 'new-faq', element: NewFaqs },
    { path: 'tax', element: AllTaxes },
    { path: 'new-tax', element: NewTax },
    { path: 'new-coupon', element: NewCoupon },
    { path: 'coupon', element: AllCoupon },
    { path: 'marquee', element: Marquee },
    { path: 'market', element: Marketing },
    

]
export const AdminNoRoutes = [
    { path: 'login', element: AdminLogin },
    { path: 'forgot-password', element: AdminForgetPassword },
]
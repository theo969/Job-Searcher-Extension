"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const cheerio_1 = __importDefault(require("cheerio"));
puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
function scrapeJobDetail(jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_extra_1.default.launch({ headless: true });
        const page = yield browser.newPage();
        yield page.goto(`https://www.indeed.com/viewjob?jk=${jobId}`, { waitUntil: "domcontentloaded" });
        const htmlCode = yield page.evaluate(() => document.querySelector('*').outerHTML);
        let $ = cheerio_1.default.load(htmlCode);
        let jobType = [];
        let salaryInfo = [];
        $('#jobDetailsSection .jobsearch-JobDescriptionSection-sectionItem > div').each((_, el) => {
            if ($(el).text().trim() === 'Job Type') {
                $(el).nextAll().each((_, el) => {
                    jobType.push($(el).text().trim());
                });
            }
        });
        if ($('#salaryInfoAndJobType > .icl-u-xs-mr--xs.attribute_snippet').text().trim()) {
            salaryInfo.push($('#salaryInfoAndJobType > .icl-u-xs-mr--xs.attribute_snippet').text().trim());
        }
        $('#salaryGuide > ul li').each((_, el) => {
            if (!$(el).text().trim())
                return;
            salaryInfo.push($(el).text().trim().replace('..css-1nhvvuv{width:1.25rem;height:1.25rem;color:inherit;}', ''));
        });
        let result = {
            jobTitle: $('.jobsearch-JobInfoHeader-title').text().trim(),
            companyName: $('.jobsearch-InlineCompanyRating-companyHeader > a').text().trim(),
            jobType,
            salaryInfo,
            jobDescription: $("#jobDescriptionText").text().trim(),
            postDate: $(".jobsearch-HiringInsights-entry--bullet > .jobsearch-HiringInsights-entry--text").text().trim()
        };
        return result;
    });
}
exports.default = scrapeJobDetail;
